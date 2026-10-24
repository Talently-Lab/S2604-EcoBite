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
    ` select r.id, r.nombre, r.urlImagen, r.cocina, r.badgesSustentabilidad, r.badgesAhorro, r.tipoEnvase, r.puntuacion, h.dias,h.apertura,h.cierre from restaurantes r inner join horariorestaurante h on r.id = h.id_restaurante`
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
       id,
       restaurante_id,
       nombre,
       descripcion,
       precio,
       imagen_url
     FROM productos
     WHERE restaurante_id = ?
       AND activo = TRUE
     ORDER BY nombre ASC`,
    [id]
  );

  return rows;
}
