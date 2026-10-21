
import db from "../config/db.js";

export async function findRestaurantByUserId(userId) {
  const [rows] = await db.query(
    `SELECT id
     FROM restaurantes
     WHERE usuario_id = ?
       AND activo = TRUE`,
    [userId]
  );

  return rows[0] ?? null;
}

export async function createProduct({
  restaurante_id,
  nombre,
  descripcion,
  precio,
  imagen_url
}) {
  const [result] = await db.query(
    `INSERT INTO productos (
      restaurante_id,
      nombre,
      descripcion,
      precio,
      imagen_url
    )
    VALUES (?, ?, ?, ?, ?)`,
    [
      restaurante_id,
      nombre,
      descripcion,
      precio,
      imagen_url
    ]
  );

  const [rows] = await db.query(
    `SELECT
      id,
      restaurante_id,
      nombre,
      descripcion,
      precio,
      imagen_url,
      activo,
      created_at,
      updated_at
     FROM productos
     WHERE id = ?`,
    [result.insertId]
  );

  return rows[0];
}


export async function getProductsByRestaurantId(restauranteId) {
  const [products] = await db.query(
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
    ORDER BY id DESC`,
    [restauranteId]
  );

  return products;
}
