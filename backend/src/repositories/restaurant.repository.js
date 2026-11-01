import db from "../config/db.js"

export async function createRestaurant({
  usuario_id,
  nombre,
  direccion,
  latitud,
  longitud
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
      [
        usuario_id,
        nombre,
        direccion,
        latitud,
        longitud
      ]
    );
  const [rows] = await db.query(`SELECT * FROM restaurantes WHERE id = ?`, [result.insertId]);
  return rows[0];
}


export async function getRestaurants(){
  const [rows] = await db.query(
    `SELECT * FROM restaurantes WHERE activo = 1`
  );
  return rows;
}

export async function getRestaurantById(id){
  const [rows] = await db.query(`SELECT * FROM restaurantes WHERE id = ?`, [id]);
  return rows[0];
}


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
