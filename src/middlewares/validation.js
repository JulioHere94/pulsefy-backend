const validateRegister = (req, res, next) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
  }

  if (senha.length < 6) {
    return res
      .status(400)
      .json({ msg: "A senha deve ter pelo menos 6 caracteres" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ msg: "Email inválido" });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ msg: "Email e senha são obrigatórios" });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};
