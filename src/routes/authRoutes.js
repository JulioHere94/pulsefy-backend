const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getAllUsers,
  getCurrentUser,
  updateUser,
} = require("../controllers/authController");
const {
  validateRegister,
  validateLogin,
} = require("../middlewares/validation");
const auth = require("../middlewares/auth");

// Rotas públicas
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

// Rotas protegidas
router.get("/me", auth, getCurrentUser);
router.put("/me", auth, updateUser);
router.get("/users", auth, getAllUsers);

module.exports = router;
