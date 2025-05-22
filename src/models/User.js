const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  imagem: {
    type: String,
    default: () => process.env.DEFAULT_IMAGE_URL, // Corrigido para função
  },
});

module.exports = mongoose.model("User", UserSchema);
