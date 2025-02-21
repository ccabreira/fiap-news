const express = require("express");
const router = express.Router();

// Exemplo de rota para listar usuários (pode ser ajustado depois)
router.get("/", (req, res) => {
    res.send("Lista de usuários");
});

module.exports = router;

