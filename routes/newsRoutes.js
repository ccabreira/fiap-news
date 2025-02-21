const express = require("express");
const multer = require("multer");
const {
  getNews,
  createNews,
  updateNews,
  deleteNews,
  getNewsById
} = require("../controllers/newsController");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Configuração do multer para armazenar imagens na pasta 'uploads/'
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Middleware para validação de entrada de dados
const validateNews = [
  body("title").notEmpty().withMessage("O título é obrigatório"),
  body("category").notEmpty().withMessage("A categoria é obrigatória"),
  body("author").notEmpty().withMessage("O autor é obrigatório"),
  body("content").notEmpty().withMessage("O conteúdo é obrigatório"),
];

// Middleware para validar os erros
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// 🔹 Rota para listar todas as notícias com paginação, ordenação e filtros
router.get("/", getNews);

// 🔹 Rota para obter uma única notícia por ID
router.get("/:id", getNewsById);

// 🔹 Rota para criar uma nova notícia
router.post("/news", upload.single("image"), validateNews, validateRequest, createNews);

// 🔹 Rota para atualizar uma notícia pelo ID
router.put("/news/:id", upload.single("image"), validateNews, validateRequest, updateNews);

// 🔹 Rota para deletar uma notícia pelo ID
router.delete("/news/:id", deleteNews);

module.exports = router;
