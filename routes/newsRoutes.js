const express = require("express");
const multer = require("multer");
const { getNews, createNews, updateNews, deleteNews } = require("../controllers/newsController");

const router = express.Router();

// Configuração do multer para armazenar imagens na pasta 'uploads/'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// 🔹 Rota para listar notícias com paginação, filtros e ordenação
router.get("/", getNews);

// 🔹 Rota para criar uma nova notícia com validação
const { body, validationResult } = require("express-validator");

router.post(
  "/news",
  upload.single("image"), // Middleware para upload de imagem
  [
    body("title").notEmpty().withMessage("O título é obrigatório"),
    body("category").notEmpty().withMessage("A categoria é obrigatória"),
    body("author").notEmpty().withMessage("O autor é obrigatório"),
    body("content").notEmpty().withMessage("O conteúdo é obrigatório"),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    createNews(req, res, next);
  }
);

// 🔹 Rota para atualizar uma notícia
router.put("/news/:id", upload.single("image"), updateNews);

// 🔹 Rota para deletar uma notícia
router.delete("/news/:id", deleteNews);

module.exports = router;

