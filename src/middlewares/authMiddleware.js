const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return next(new AppError("Acesso não autorizado. Token ausente.", 401));
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new AppError("Token inválido ou expirado.", 403));
  }
};

module.exports = authMiddleware;

