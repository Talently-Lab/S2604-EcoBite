import db from "../config/db.js";

const DIAS_SEMANA = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

// Obtener todos los restaurantes, activos y desactivados
export async function getAllRestaurants() {
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
     GROUP BY r.id
     ORDER BY r.id DESC`
  );

  if (restaurants.length === 0) {
    return [];
  }

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
      activo: Boolean(restaurant.activo),
      co2_total_ahorrado: Number(restaurant.co2_total_ahorrado),
      horarios: horariosCompletos,
    };
  });
}

// Cambiar el estado de un restaurante
export async function updateRestaurantStatus(restauranteId, activo) {
  const [result] = await db.query(
    `UPDATE restaurantes
     SET activo = ?
     WHERE id = ?`,
    [activo, restauranteId]
  );

  if (result.affectedRows === 0) {
    const [rows] = await db.query(
      `SELECT id, activo
       FROM restaurantes
       WHERE id = ?`,
      [restauranteId]
    );

    return rows[0] ?? null;
  }

  const [rows] = await db.query(
    `SELECT id, activo
     FROM restaurantes
     WHERE id = ?`,
    [restauranteId]
  );

  return rows[0] ?? null;
}


export async function updateRestaurantBadge(restauranteId, badges) {
  const [result] = await db.query(
    `UPDATE restaurantes
     SET badge_sustentabilidad = ?
     WHERE id = ?`,
    [
      badges === null ? null : JSON.stringify(badges),
      restauranteId
    ]
  );

  // Si no se modificó ninguna fila, verificamos si el restaurante existe.
  if (result.affectedRows === 0) {
    const [existingRestaurant] = await db.query(
      `SELECT id
       FROM restaurantes
       WHERE id = ?`,
      [restauranteId]
    );

    if (existingRestaurant.length === 0) {
      return null;
    }
  }

  const [rows] = await db.query(
    `SELECT id, badge_sustentabilidad
     FROM restaurantes
     WHERE id = ?`,
    [restauranteId]
  );

  if (rows.length === 0) {
    return null;
  }

  return {
    ...rows[0],
    badge_sustentabilidad:
      rows[0].badge_sustentabilidad === null
        ? null
        : typeof rows[0].badge_sustentabilidad === "string"
          ? JSON.parse(rows[0].badge_sustentabilidad)
          : rows[0].badge_sustentabilidad
  };
}