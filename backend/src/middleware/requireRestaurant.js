
export function requireRestaurant(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      message: "Debés iniciar sesión"
    });
  }

  if (req.user.rol !== "restaurante") {
    return res.status(403).json({
      message: "Solo los restaurantes pueden gestionar sus platos"
    });
  }

  next();
}
