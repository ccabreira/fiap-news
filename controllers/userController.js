const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const AppError = require("../utils/AppError");

// 🔹 Login do usuário e geração do Token JWT
const loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return next(new AppError("E-mail e senha são obrigatórios", 400));
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return next(new AppError("Usuário não encontrado", 404));
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return next(new AppError("Credenciais inválidas", 401));
      }
  
      // Gera o Token JWT
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.json({ message: "Login bem-sucedido", token });
    } catch (err) {
      next(err);
    }
  };

// 🔹 Criar um novo usuário
const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new AppError("Todos os campos são obrigatórios", 400));
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new AppError("E-mail já cadastrado", 400));
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "Usuário criado com sucesso", user });
  } catch (err) {
    next(err);
  }
};

// 🔹 Exporta todas as funções corretamente
module.exports = { createUser, loginUser };

