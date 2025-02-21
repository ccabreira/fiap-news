const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: [true, "O título é obrigatório!"] },
  category: { type: String, required: [true, "A categoria é obrigatória!"] },
  author: { type: String, required: [true, "O autor é obrigatório!"] },
  date: { type: Date, default: Date.now },
  image: { type: String },
  content: { type: String, required: [true, "O conteúdo é obrigatório!"] }
});

module.exports = mongoose.model("News", NewsSchema);


