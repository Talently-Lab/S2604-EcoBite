import jwt from "jsonwebtoken";
import "../config/env.js";

export function generateToken(user){

  const payload = {
    id: user.id,
    rol: user.rol,
    email: user.email,
    name: user.nombre,
    avatar_url: user.avatar_url,
    perfil_completado: user.perfil_completado
  }

  const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, {expiresIn: "1h"});

  return token;
}


export function generateRegistrationToken(googleUser) {
  const payload = {
    type: "registration",
    provider: "google",
    googleId: googleUser.id,
    email: googleUser.email,
    name: googleUser.name,
    avatar_url: googleUser.picture,
  }

  const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, { expiresIn: "20m" });

  return token;
}

