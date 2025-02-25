const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const newsRoutes = require("./routes/newsRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorMiddleware");

// Configurar o aplicativo Express
const App = express();

// Middlewares
App.use(morgan("dev")); // Log de requisições
App.use(express.json()); // Parsear JSON no corpo das requisições
App.use(cors()); // Habilitar CORS

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
});
App.use(limiter);

// Rotas
App.use("/api/news", newsRoutes);
App.use("/api/users", userRoutes);

// Rota não encontrada (404)
App.use((req, res, next) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

// Middleware de tratamento de erros
App.use(errorHandler);

// Exportar o app para ser usado em outros arquivos
module.exports = App;