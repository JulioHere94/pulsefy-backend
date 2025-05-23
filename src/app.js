const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Configuração do CORS - mais permissiva para debug
app.use(
  cors({
    origin: true, // Permite todas as origens temporariamente
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Configuração do Helmet com algumas restrições relaxadas para debug
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "unsafe-none" },
  })
);

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

module.exports = app;
