
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

// Categorías de productos
export async function getCategoriasProducto() {
  const [rows] = await db.query(
    `SELECT id, nombre
     FROM categoria_producto
     ORDER BY id ASC`
  );

  return rows;
}

export async function getCategoriaProductoById(categoriaId) {
  const [rows] = await db.query(
    `SELECT id, nombre
     FROM categoria_producto
     WHERE id = ?`,
    [categoriaId]
  );

  return rows[0] ?? null;
}

// Tipos de envase
export async function getTipoEnvaseById(tipoEnvaseId) {
  const [rows] = await db.query(
    `SELECT id, nombre
     FROM tipos_envase
     WHERE id = ?`,
    [tipoEnvaseId]
  );

  return rows[0] ?? null;
}

export async function getTiposEnvase() {
  const [rows] = await db.query(
    `SELECT id, nombre
     FROM tipos_envase
     ORDER BY id ASC`
  );

  return rows;
}

// Crear producto
export async function createProduct({
  restaurante_id,
  nombre,
  descripcion,
  precio,
  imagen_url,
  tipo_envase_id,
  categoria_producto_id,
}) {
  const [result] = await db.query(
    `INSERT INTO productos (
      restaurante_id,
      nombre,
      descripcion,
      precio,
      imagen_url,
      tipo_envase_id,
      categoria_producto_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      restaurante_id,
      nombre,
      descripcion,
      precio,
      imagen_url,
      tipo_envase_id,
      categoria_producto_id,
    ]
  );

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
       cp.nombre AS categoria,
       p.activo,
       p.created_at,
       p.updated_at
     FROM productos p
     INNER JOIN tipos_envase te
       ON te.id = p.tipo_envase_id
     INNER JOIN categoria_producto cp
       ON cp.id = p.categoria_producto_id
     WHERE p.id = ?`,
    [result.insertId]
  );

  return rows[0];
}

// Listar productos activos de un restaurante
export async function getProductsByRestaurantId(restauranteId) {
  const [products] = await db.query(
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
     ORDER BY p.id DESC`,
    [restauranteId]
  );

  return products;
}
// Listar todos los productos de un restaurante (activos y desactivados)
export async function getAllProductsByRestaurantId(restauranteId) {
  const [products] = await db.query(
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
       cp.nombre AS categoria,
       p.activo,
       p.created_at,
       p.updated_at
     FROM productos p
     INNER JOIN tipos_envase te
       ON te.id = p.tipo_envase_id
     INNER JOIN categoria_producto cp
       ON cp.id = p.categoria_producto_id
     WHERE p.restaurante_id = ?
     ORDER BY p.id DESC`,
    [restauranteId]
  );

  return products.map((product) => ({
    ...product,
    precio: Number(product.precio),
    activo: Boolean(product.activo),
  }));
}

// Actualizar producto de un restaurante
export async function updateProduct({
  productoId,
  restauranteId,
  nombre,
  descripcion,
  precio,
  imagen_url,
  tipo_envase_id,
  categoria_producto_id,
}) {
  await db.query(
    `UPDATE productos
     SET nombre = ?,
         descripcion = ?,
         precio = ?,
         imagen_url = ?,
         tipo_envase_id = ?,
         categoria_producto_id = ?
     WHERE id = ?
       AND restaurante_id = ?
       AND activo = TRUE`,
    [
      nombre,
      descripcion,
      precio,
      imagen_url,
      tipo_envase_id,
      categoria_producto_id,
      productoId,
      restauranteId,
    ]
  );

  // Devolver el producto actualizado con los nombres de envase y categoría
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
       cp.nombre AS categoria,
       p.activo,
       p.created_at,
       p.updated_at
     FROM productos p
     INNER JOIN tipos_envase te
       ON te.id = p.tipo_envase_id
     INNER JOIN categoria_producto cp
       ON cp.id = p.categoria_producto_id
     WHERE p.id = ?
       AND p.restaurante_id = ?
       AND p.activo = TRUE`,
    [productoId, restauranteId]
  );

  return rows[0] ?? null;
}

export async function toggleProductStatus({ productoId, restauranteId, activo }) {
  const [result] = await db.query(
    `UPDATE productos
     SET activo = ?
     WHERE id = ?
       AND restaurante_id = ?`,
    [activo, productoId, restauranteId]
  );

  if (result.affectedRows === 0) {
    const [rows] = await db.query(
      `SELECT id, activo
       FROM productos
       WHERE id = ? AND restaurante_id = ?`,
      [productoId, restauranteId]
    );

    return rows[0] ?? null;
  }

  const [rows] = await db.query(
    `SELECT id, activo
     FROM productos
     WHERE id = ? AND restaurante_id = ?`,
    [productoId, restauranteId]
  );

  return rows[0] ?? null;
}