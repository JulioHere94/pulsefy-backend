const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../config/logger");

exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "Usuário já existe" });

    const hashedPassword = await bcrypt.hash(senha, 10);

    user = new User({
      nome,
      email,
      senha: hashedPassword,
      imagem: process.env.DEFAULT_IMAGE_URL,
    });

    await user.save();
    logger.info(`Novo usuário registrado: ${email}`);

    res.status(201).json({ msg: "Usuário criado com sucesso" });
  } catch (err) {
    logger.error(`Erro no registro: ${err.message}`);
    res.status(500).json({
      msg: "Erro no servidor",
      error: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Credenciais inválidas" });

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) return res.status(400).json({ msg: "Credenciais inválidas" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    logger.info(`Usuário logado: ${email}`);

    res.json({
      token,
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        imagem: user.imagem,
      },
    });
  } catch (err) {
    logger.error(`Erro no login: ${err.message}`);
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    logger.info("Buscando todos os usuários");
    const users = await User.find().select("-senha"); // Exclui o campo senha do resultado
    res.json(users);
  } catch (err) {
    logger.error(`Erro ao buscar usuários: ${err.message}`);
    res.status(500).json({
      msg: "Erro ao buscar usuários",
      error: err.message,
    });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    logger.info(`Buscando usuário atual: ${req.user._id}`);
    const user = await User.findById(req.user._id).select("-senha");
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (err) {
    logger.error(`Erro ao buscar usuário atual: ${err.message}`);
    res.status(500).json({
      msg: "Erro ao buscar usuário",
      error: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { nome, imagem } = req.body;
    const userId = req.user._id;

    const updateData = {};
    if (nome) updateData.nome = nome;
    if (imagem) updateData.imagem = imagem;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    ).select("-senha");

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    logger.info(`Usuário atualizado: ${userId}`);
    res.json(user);
  } catch (err) {
    logger.error(`Erro ao atualizar usuário: ${err.message}`);
    res.status(500).json({
      msg: "Erro ao atualizar usuário",
      error: err.message,
    });
  }
};
