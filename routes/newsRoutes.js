const express = require("express");
const multer = require("multer");
const News = require("../models/News");

const router = express.Router();

// Configuração para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// 🔹 ROTA: Listar todas as notícias com paginação
router.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const news = await News.find()
      .skip((page - 1) * limit) // Pula os registros anteriores
      .limit(limit); // Limita a quantidade de registros

    const total = await News.countDocuments(); // Total de notícias no banco

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      data: news
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar notícias" });
  }
});

// Criar uma nova notícia com tratamento de erros
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newNews = new News({
      title: req.body.title,
      category: req.body.category,
      author: req.body.author,
      image: req.file ? `/uploads/${req.file.filename}` : "",
      content: req.body.content
    });

    await newNews.save();
    res.status(201).json(newNews);
  } catch (err) {
    res.status(400).json({ error: err.message || "Erro ao salvar notícia" });
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

module.exports = router;
