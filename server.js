require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const newsRoutes = require("./routes/newsRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

// 🔹 Conectar ao banco de dados
connectDB();

const app = express();

// 🔹 Middleware para registrar requisições
app.use(morgan("dev"));

// 🔹 Configuração do Rate Limit (evita ataques DDoS)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
  message: "Muitas requisições feitas, tente novamente mais tarde.",
});
app.use(limiter);

// 🔹 Configuração do CORS
app.use(cors());
app.use(express.json());

// 🔹 Servir arquivos de imagens da pasta uploads
app.use("/uploads", express.static("uploads"));

// 🔹 Definição das rotas
app.use("/news", newsRoutes);
app.use("/users", userRoutes);

// 🔹 Rota principal da API
app.get("/", (req, res) => res.send("🚀 API rodando!"));

// 🔹 Middleware de Tratamento Global de Erros
app.use(errorHandler);

// 🔹 Iniciar Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 API rodando na porta ${PORT}`));






