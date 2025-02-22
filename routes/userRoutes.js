const express = require("express");
const { createUser, loginUser } = require("../controllers/userController");

const router = express.Router();

// 🔹 Criar usuário
router.post("/register", createUser);

// 🔹 Login de usuário
router.post("/login", loginUser);

module.exports = router;

