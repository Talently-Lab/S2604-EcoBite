import db from "../config/db.js";
//constantes del dia de la semana
const DIAS_SEMANA = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];
// crear restaurante
export async function createRestaurant({
  usuario_id,
  nombre,
  direccion,
  latitud,
  longitud,
}) {
  const [result] = await db.query(
    `INSERT INTO restaurantes
     (
       usuario_id,
       nombre,
       direccion,
       latitud,
       longitud
     )
     VALUES (?, ?, ?, ?, ?)`,
    [usuario_id, nombre, direccion, latitud, longitud]
  );

  const [rows] = await db.query(
    `SELECT * FROM restaurantes WHERE id = ?`,
    [result.insertId]
  );

  return rows[0];
}
//obtener todos los restaurantes activos y sus horarios 
export async function getRestaurants() {
  // 1. Obtener restaurantes activos y calcular el CO2 total ahorrado
  const [restaurants] = await db.query(
    `SELECT
     r.*,
     COALESCE(
       SUM(
         CASE
           WHEN p.estado_pedido = 'entregado'
           THEN e.co2_ahorrado_kg
           ELSE 0
         END
       ), 0
     ) AS co2_total_ahorrado
   FROM restaurantes r
   LEFT JOIN pedidos p
     ON p.restaurante_id = r.id
   LEFT JOIN entregas e
     ON e.pedido_id = p.id
   WHERE r.activo = 1
   GROUP BY r.id
   ORDER BY r.id DESC`
  );

  // Si no hay restaurantes, devolvemos un array vacío
  if (restaurants.length === 0) {
    return [];
  }

  // 2. Obtener los horarios de todos los restaurantes
  const restaurantIds = restaurants.map(
    (restaurant) => restaurant.id
  );

  const [horarios] = await db.query(
    `SELECT
       restaurante_id,
       dia_semana,
       hora_apertura,
       hora_cierre
     FROM horarios_restaurante
     WHERE restaurante_id IN (?)
     ORDER BY restaurante_id, dia_semana ASC`,
    [restaurantIds]
  );

  // 3. Agrupar los horarios por restaurante
  const horariosPorRestaurante = new Map();

  for (const horario of horarios) {
    const restauranteId = Number(horario.restaurante_id);

    if (!horariosPorRestaurante.has(restauranteId)) {
      horariosPorRestaurante.set(restauranteId, new Map());
    }

    horariosPorRestaurante
      .get(restauranteId)
      .set(Number(horario.dia_semana), horario);
  }

  // 4. Agregar los siete días a cada restaurante
  return restaurants.map((restaurant) => {
    const horariosGuardados =
      horariosPorRestaurante.get(Number(restaurant.id)) ?? new Map();

    const horariosCompletos = DIAS_SEMANA.map((dia, index) => {
      const horario = horariosGuardados.get(index);

      return {
        dia_semana: index,
        dia,
        hora_apertura: horario?.hora_apertura ?? null,
        hora_cierre: horario?.hora_cierre ?? null,
      };
    });

    return {
        ...restaurant,
        co2_total_ahorrado: Number(restaurant.co2_total_ahorrado),
        horarios: horariosCompletos,
    };
  });
}
//obtener el restaurante por id
export async function getRestaurantById(id) {
  const [rows] = await db.query(
    `SELECT * FROM restaurantes WHERE id = ?`,
    [id]
  );

  return rows[0];
}

// Obtener el restaurante asociado al usuario autenticado
export async function getRestaurantByUserId(userId) {
  const [rows] = await db.query(
    `SELECT *
     FROM restaurantes
     WHERE usuario_id = ?
       AND activo = TRUE`,
    [userId]
  );

  return rows[0] ?? null;
}
// obtener el menu 
export async function getRestaurantMenu(id) {
  const [rows] = await db.query(
    `SELECT
       p.id,
       p.restaurante_id,
       p.nombre,
       p.descripcion,
       p.precio,
       p.imagen_url,
       p.tipo_envase_id,
       te.nombre AS tipo_envase,
       p.categoria_producto_id,
       cp.nombre AS categoria
     FROM productos p
     INNER JOIN tipos_envase te
       ON te.id = p.tipo_envase_id
     INNER JOIN categoria_producto cp
       ON cp.id = p.categoria_producto_id
     WHERE p.restaurante_id = ?
       AND p.activo = TRUE
     ORDER BY p.nombre ASC`,
    [id]
  );

  return rows;
}

// Consultar los horarios de los siete días del restaurante
export async function getRestaurantSchedule(restauranteId) {
  const [rows] = await db.query(
    `SELECT
       dia_semana,
       hora_apertura,
       hora_cierre
     FROM horarios_restaurante
     WHERE restaurante_id = ?
     ORDER BY dia_semana ASC`,
    [restauranteId]
  );

  const horariosGuardados = new Map(
    rows.map((horario) => [
      Number(horario.dia_semana),
      horario,
    ])
  );

  return DIAS_SEMANA.map((dia, index) => {
    const horario = horariosGuardados.get(index);

    return {
      dia_semana: index,
      dia,
      hora_apertura: horario?.hora_apertura ?? null,
      hora_cierre: horario?.hora_cierre ?? null,
    };
  });
}

// guardar o actualizar los horarios del restaurante 
export async function saveRestaurantSchedule(restauranteId, horarios) {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    for (const horario of horarios) {
      await connection.query(
        `INSERT INTO horarios_restaurante (
           restaurante_id,
           dia_semana,
           hora_apertura,
           hora_cierre
         )
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           hora_apertura = VALUES(hora_apertura),
           hora_cierre = VALUES(hora_cierre)`,
        [
          restauranteId,
          horario.dia_semana,
          horario.hora_apertura,
          horario.hora_cierre,
        ]
      );
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

// actualizar el perfil del restaurante - descripcion y url de la imagen
export async function updateRestaurantProfile({
  restauranteId,
  descripcion,
  imagen_url,
}){
  await db.query(
    `UPDATE restaurantes
     SET descripcion = ?,
         imagen_url = ?
     WHERE id = ?`,
    [descripcion, imagen_url, restauranteId]
  );

  const [ rows ] = await db.query(`SELECT * FROM restaurantes WHERE id = ?`, [restauranteId]);
  return rows[0] ?? null;
}