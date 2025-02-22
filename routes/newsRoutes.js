const express = require("express");
const multer = require("multer");
const { getNews, getNewsById, createNews, updateNews, deleteNews } = require("../controllers/newsController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Configuração do upload de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// 🔹 Rota para listar todas as notícias (pública)
router.get("/", getNews);

// 🔹 Rota para buscar uma notícia por ID (pública)
router.get("/:id", getNewsById);

// 🔹 Criar notícia (Protegida por autenticação)
router.post("/", authMiddleware, upload.single("image"), createNews);

// 🔹 Atualizar notícia (Protegida por autenticação)
router.put("/:id", authMiddleware, upload.single("image"), updateNews);

// 🔹 Deletar notícia (Protegida por autenticação)
router.delete("/:id", authMiddleware, deleteNews);

module.exports = router;

