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

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Configuração do armazenamento no Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "fiap-news", // Pasta onde as imagens serão armazenadas no Cloudinary
    format: async (req, file) => "jpg", // Formato padrão
    public_id: (req, file) => file.originalname, // Nome do arquivo
  },
});

const upload = multer({ storage }); // Middleware de upload para ser usado nas rotas

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch((err) => console.error("❌ Erro ao conectar:", err));

app.use("/news", newsRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => res.send("🚀 API rodando!"));

app.listen(5000, () => console.log("🚀 API rodando na porta 5000"));


