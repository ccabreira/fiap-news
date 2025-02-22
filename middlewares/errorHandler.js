const AppError = require("../utils/AppError");

const errorHandler = (err, req, res, next) => {
  console.error("Erro detectado:", err.message);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  res.status(500).json({
    success: false,
    message: "Erro interno no servidor"
  });
};

module.exports = errorHandler;


  