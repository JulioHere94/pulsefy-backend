const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ msg: "Token não fornecido" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-senha");

    if (!user) {
      return res.status(401).json({ msg: "Usuário não encontrado" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Não autorizado" });
  }
};

module.exports = auth;
