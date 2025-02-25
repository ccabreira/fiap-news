require("dotenv").config();
const connectDB = require("./config/db");
const app = require("./server");

// Conectar ao banco de dados
connectDB();

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 API rodando na porta ${PORT}`));