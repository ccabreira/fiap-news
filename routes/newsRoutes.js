const express = require("express");
const multer = require("multer");
const News = require("../models/News");

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

const upload = multer({ storage: storage });

// Rota para listar notícias com paginação, ordenação e filtros
router.get("/", async (req, res) => {
  try {
      const { page = 1, limit = 5, category, author } = req.query;
      const filter = {};

      // Adiciona filtro de categoria se passado na URL
      if (category) filter.category = category;

      // Adiciona filtro de autor se passado na URL
      if (author) filter.author = author;

      // Busca no MongoDB com filtros, ordenação e paginação
      const news = await News.find(filter)
          .sort({ date: -1 }) // Ordena mais recentes primeiro
          .limit(parseInt(limit))
          .skip((parseInt(page) - 1) * parseInt(limit))
          .exec();

      // Conta o total de notícias para calcular páginas
      const count = await News.countDocuments(filter);

      // Retorna os dados formatados para o frontend
      res.json({
          totalPages: Math.ceil(count / limit),
          currentPage: parseInt(page),
          totalNews: count,
          data: news
      });
  } catch (err) {
      res.status(500).json({ error: "Erro ao buscar notícias" });
  }
});

// Criar uma nova notícia com tratamento de erros
router.post("/news", upload.single("image"), async (req, res) => {
  try {
    const { title, category, author, content } = req.body;
    const imageUrl = req.file.path; // URL da imagem no Cloudinary

    const news = new News({
      title,
      category,
      author,
      content,
      image: imageUrl, // Agora salva a URL ao invés do arquivo local
    });

    await news.save();
    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar notícia" });
  }
});


// Atualizar uma notícia com tratamento de erro
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updatedData = { ...req.body };
    if (req.file) updatedData.image = `/uploads/${req.file.filename}`;

    const updatedNews = await News.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedNews) {
      return res.status(404).json({ error: "Notícia não encontrada" });
    }

    res.json(updatedNews);
  } catch (err) {
    res.status(400).json({ error: "Erro ao atualizar notícia" });
  }
});


// 🔹 ROTA: Deletar uma notícia pelo ID
router.delete("/:id", async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: "Notícia removida com sucesso" });
  } catch (err) {
    res.status(400).json({ error: "Erro ao remover notícia" });
  }
});

// Rota para criar uma notícia com upload de imagem
router.post("/news", upload.single("image"), async (req, res) => {
  try {
    const { title, category, author, content } = req.body;
    const image = req.file ? req.file.filename : null; // Se houver imagem, armazena o nome do arquivo

    const newNews = new News({ title, category, author, content, image });
    await newNews.save();

    res.status(201).json({ message: "Notícia criada com sucesso!", news: newNews });
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar notícia" });
  }
});


module.exports = router;
