const News = require("../models/News");

// 🔹 Buscar todas as notícias com paginação, filtros e ordenação
const getNews = async (req, res, next) => {
  try {
    const { page = 1, limit = 5, category, author } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (author) filter.author = author;

    const news = await News.find(filter)
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const count = await News.countDocuments(filter);

    res.json({
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalNews: count,
      data: news,
    });
  } catch (err) {
    next(err);
  }
};

// 🔹 Criar uma nova notícia
const createNews = async (req, res, next) => {
  try {
    const { title, category, author, content } = req.body;
    const imageUrl = req.file?.path || null;

    const news = new News({ title, category, author, content, image: imageUrl });
    await news.save();

    res.status(201).json(news);
  } catch (err) {
    next(err);
  }
};

// 🔹 Atualizar uma notícia
const updateNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (req.file) updatedData.image = req.file.path;

    const news = await News.findByIdAndUpdate(id, updatedData, { new: true });

    if (!news) {
      return res.status(404).json({ error: "Notícia não encontrada" });
    }

    res.json(news);
  } catch (err) {
    next(err);
  }
};

// 🔹 Deletar uma notícia
const deleteNews = async (req, res, next) => {
  try {
    const { id } = req.params;

    const news = await News.findByIdAndDelete(id);

    if (!news) {
      return res.status(404).json({ error: "Notícia não encontrada" });
    }

    res.json({ message: "Notícia removida com sucesso" });
  } catch (err) {
    next(err);
  }
};

// 🔹 Exportação correta das funções
module.exports = {
  getNews,
  createNews,
  updateNews,
  deleteNews,
};


