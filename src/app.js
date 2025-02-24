require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const limiter = require("./config/rateLimit");
const errorHandler = require("./middlewares/errorHandler");

const newsRoutes = require("./routes/newsRoutes");
const userRoutes = require("./routes/userRoutes");

// Conectar ao banco de dados
connectDB();

const app = express();

// Middlewares
app.use(morgan("dev")); // Log de requisições
app.use(limiter); // Rate limiting para evitar abusos
app.use(cors({ origin: process.env.ALLOWED_ORIGINS.split(",") })); // Configuração do CORS
app.use(express.json()); // Parse de JSON no corpo das requisições
app.use("/uploads", express.static("uploads")); // Servir arquivos estáticos da pasta uploads

// Rotas
app.use("/api/news", newsRoutes); // Prefixo /api/news para as rotas de notícias
app.use("/api/users", userRoutes); // Prefixo /api/users para as rotas de usuários

// Rota principal
app.get("/", (req, res) => res.send("🚀 API rodando!"));

// Tratamento de erros global
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 API rodando na porta ${PORT}`));