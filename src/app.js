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
app.use(morgan("dev"));
app.use(limiter);
app.use(cors({ origin: process.env.ALLOWED_ORIGINS.split(",") }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Rotas
app.use("/news", newsRoutes);
app.use("/users", userRoutes);

// Rota principal
app.get("/", (req, res) => res.send("🚀 API rodando!"));

// Tratamento de erros
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 API rodando na porta ${PORT}`));