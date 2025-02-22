require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes"); // Importando corretamente as rotas de usuário

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 🔹 Conectar ao MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("API rodando...");
});

const News = require("./models/News"); // Importe o modelo de notícias (se já existir)

// 🔹 Rota para buscar todas as notícias
app.get("/news", async (req, res) => {
  try {
    const news = await News.find();
    res.json({ totalNews: news.length, data: news });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar notícias" });
  }
});

// 🔹 Adicionar as rotas de autenticação
app.use("/auth", userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


