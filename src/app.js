require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const newsRoutes = require("./routes/newsRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");

// Conectar ao banco de dados
connectDB();

// Configurar o aplicativo Express
const app = express();

// Middlewares
app.use(morgan("dev")); // Log de requisições
app.use(express.json()); // Parsear JSON no corpo das requisições
app.use(cors()); // Habilitar CORS

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
});
app.use(limiter);

// Rotas
app.use("/news", newsRoutes);
app.use("/users", userRoutes);

// Rota não encontrada (404)
app.use((req, res, next) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

// Middleware de tratamento de erros
app.use(errorHandler);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 API rodando na porta ${PORT}`));