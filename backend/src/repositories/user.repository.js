import db from "../config/db.js";

export async function findUserByGoogleId(googleId) {

  const [rows] = await db.query(
    "SELECT * FROM users WHERE google_id = ?",
    [googleId]
  );

  return rows[0];
}

export async function findUserByEmail(email){
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
}

export async function createUser({
  googleId,
  nombre,
  email,
  password_hash,
  avatar_url,
  rol
}) {

  const [result] = await db.query(
    `INSERT INTO users
    (
      google_id,
      nombre,
      email,
      password_hash,
      avatar_url,
      rol,
      perfil_completado
    )
    VALUES (?, ?, ?, ?, ?, ?, TRUE)`,
    [
      googleId,
      nombre,
      email,
      password_hash,
      avatar_url,
      rol
    ]
  );

  const [rows] = await db.query(
    "SELECT * FROM users WHERE id = ?",
    [result.insertId]
  );

  return rows[0];
}

