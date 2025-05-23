const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Configuração do CORS - apenas para desenvolvimento local
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "https://pulsefy.mooo.com",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
}

// Middleware para logging de requisições
app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  console.log("Request Method:", req.method);
  console.log("Request Headers:", req.headers);
  next();
});

app.use(express.json());
app.use(helmet());

// Rotas
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/data", require("./routes/dataRoutes"));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Erro no servidor" });
});

module.exports = app;
