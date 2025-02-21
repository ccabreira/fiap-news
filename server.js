require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const newsRoutes = require("./routes/newsRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// 🔹 Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// 🔹 Configuração do armazenamento no Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "fiap-news", // Pasta onde as imagens serão armazenadas no Cloudinary
    format: async (req, file) => "jpg", // Formato padrão
    public_id: (req, file) => file.originalname, // Nome do arquivo
  },
});

const upload = multer({ storage });

const app = express();

// 🔹 Logger para requisições
app.use(morgan("dev"));

// 🔹 Configuração do Rate Limit (evita ataques DDoS)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
  message: "Muitas requisições feitas, tente novamente mais tarde.",
});
app.use(limiter);

// 🔹 Configuração do CORS (permitir acesso apenas de domínios específicos)
const corsOptions = {
  origin: ["http://localhost:3000", "https://seuprojeto.com"], // Adicione o domínio do frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use(express.json());

// 🔹 Servir arquivos de imagens da pasta uploads
app.use("/uploads", express.static("uploads"));

// 🔹 Conexão com o MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch((err) => console.error("❌ Erro ao conectar:", err));

// 🔹 Definição das rotas
app.use("/news", newsRoutes);
app.use("/users", userRoutes);

// 🔹 Rota principal da API
app.get("/", (req, res) => res.send("🚀 API rodando!"));

// 🔹 Middleware de Tratamento Global de Erros
app.use(errorHandler);

// 🔹 Iniciar Servidor
app.listen(5000, () => console.log("🚀 API rodando na porta 5000"));



