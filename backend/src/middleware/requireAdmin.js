export function requireAdmin(req, res, next) {
  if (req.user?.rol !== "admin") {
    return res.status(403).json({
      message: "No tienes permisos para acceder a este recurso",
    });
  }

  next();
}