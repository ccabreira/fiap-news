require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const newsRoutes = require("./routes/newsRoutes"); 
const userRoutes = require("./routes/userRoutes"); 


const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads")); // Servir imagens publicamente

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch((err) => console.error("❌ Erro ao conectar:", err));

app.use("/news", newsRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => res.send("🚀 API rodando!"));

app.listen(5000, () => console.log("🚀 API rodando na porta 5000"));


