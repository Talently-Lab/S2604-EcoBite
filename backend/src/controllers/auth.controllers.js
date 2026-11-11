import {
  getGoogleAuthURL,
  getGoogleUser
} from "../services/google.service.js";

import {
  findUserByGoogleId,
  findUserByEmail,
  createUser
} from "../repositories/user.repository.js";
import { createRestaurant } from "../repositories/restaurant.repository.js";
import { geocodeAddress } from "../services/geocoding.service.js";

import {
  generateToken,
  generateRegistrationToken
} from "../services/jwt.service.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export function googleAuth(req, res) {
  const url = getGoogleAuthURL();

  res.redirect(url);
}


export async function googleCallback(req, res) {
  try {
    const code = req.query.code;

    if (!code) {
      return res.status(400).json({
        message: "No code provided"
      });
    }

    const googleUser = await getGoogleUser(code);

    const googleId = googleUser.id;


    const user = await findUserByGoogleId(googleId);

    if (user) {
      const token = generateToken(user);

      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000
      });

      return res.redirect(
        `${process.env.FRONTEND_URL}/`
      );
    }

// new user
    const registrationToken =
      generateRegistrationToken(googleUser);

    res.cookie("registration_token", registrationToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1200000
    });

    return res.redirect(
      `${process.env.FRONTEND_URL}/crear-cuenta`
    );

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al autenticar con Google"
    });
  }
}


export function getRegistrationData(req, res) {
  try {
    const token = req.cookies.registration_token;

    if (!token) {
      return res.status(401).json({
        message: "No registration token found"
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (decoded.type !== "registration") {
      return res.status(401).json({
        message: "Token invalid"
      })
    }
    return res.json({
      email: decoded.email,
      name: decoded.name,
      avatar_url: decoded.avatar_url
    });
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: "El registro ha expirado"
    });
  }
}

export async function completeRegistration(req, res) {
  try {

    const registrationToken = req.cookies.registration_token;

    if (!registrationToken) {
      return res.status(401).json({
        message: "No registration token found"
      });
    }


    const decoded = jwt.verify(
      registrationToken,
      process.env.SECRET_KEY_JWT
    );


    if (decoded.type !== "registration") {
      return res.status(401).json({
        message: "Invalid registration token"
      });
    }


    const {
      nombre,
      rol,
      direccion
    } = req.body;


    if (!nombre || !rol) {
      return res.status(400).json({
        message: "Nombre y rol son obligatorios"
      });
    }


    if (
      rol !== "usuario" &&
      rol !== "restaurante"
    ) {
      return res.status(400).json({
        message: "Rol inválido"
      });
    }


    if (
      rol === "restaurante" &&
      !direccion
    ) {
      return res.status(400).json({
        message: "La dirección es obligatoria para restaurantes"
      });
    }


    const user = await createUser({
      googleId: decoded.googleId,
      nombre,
      email: decoded.email,
      password_hash: null,
      avatar_url: decoded.avatar_url,
      rol
    });


    if (rol === "restaurante") {

      const location = await geocodeAddress(direccion);

      if (!location) {
        return res.status(400).json({
          message: "No se pudo encontrar la dirección"
        });
      }


      await createRestaurant({
        usuario_id: user.id,
        nombre,
        direccion,
        latitud: location.latitud,
        longitud: location.longitud
      });
    }


    const token = generateToken(user);


    res.clearCookie("registration_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });


    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000
    });


    return res.status(201).json({
      message: "Cuenta creada correctamente"
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Error al completar el registro"
    });
  }
}
export async function register(req, res) {
  try {
    const {
      nombre,
      email,
      password,
      rol,
      direccion
    } = req.body;

    if (!nombre || !email || !password || !rol) {
      return res.status(400).json({
        message: "Nombre, email, contraseña y rol son obligatorios"
      });
    }

    if (rol !== "usuario" && rol !== "restaurante") {
      return res.status(400).json({
        message: "Rol inválido"
      });
    }

    if (rol === "restaurante" && !direccion) {
      return res.status(400).json({
        message: "La dirección es obligatoria para restaurantes"
      });
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        message: "El email ya está registrado"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    let location = null;

    if (rol === "restaurante") {
      location = await geocodeAddress(direccion);

      if (!location) {
        return res.status(400).json({
          message: "No se pudo encontrar la dirección"
        });
      }
    }

    const user = await createUser({
      googleId: null,
      nombre,
      email,
      password_hash: passwordHash,
      avatar_url: null,
      rol
    });

    if (rol === "restaurante") {
      await createRestaurant({
        usuario_id: user.id,
        nombre,
        direccion,
        latitud: location.latitud,
        longitud: location.longitud
      });
    }

    const token = generateToken(user);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000
    });

    return res.status(201).json({
      message: "Cuenta creada correctamente"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al registrar la cuenta"
    });
  }
}
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email y contraseña son obligatorios"
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Email o contraseña incorrectos"
      });
    }

    const passwordValid = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordValid) {
      return res.status(401).json({
        message: "Email o contraseña incorrectos"
      });
    }

    const token = generateToken(user);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000
    });

    return res.json({
      message: "Login exitoso"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al iniciar sesión"
    });
  }
}

export function logout(req, res) {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });

  res.json({
    message: "Logout successful"
  });
}


export function getMe(req, res) {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    avatar_url: req.user.avatar_url,
    rol: req.user.rol,
    perfil_completado: req.user.perfil_completado
  });
}

