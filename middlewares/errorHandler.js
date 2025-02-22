// middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error("Erro detectado:", err.message);
  
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
    res.status(statusCode).json({
      success: false,
      message: err.message || "Erro interno no servidor",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  };
  
  module.exports = errorHandler;
  