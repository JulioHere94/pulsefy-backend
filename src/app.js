const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Configuração do CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://pulsefy.mooo.com",
      "http://pulsefy.mooo.com",
      "https://api.pulsefy.mooo.com",
      "http://api.pulsefy.mooo.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    exposedHeaders: ["Access-Control-Allow-Origin"],
  })
);

app.use(helmet());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

module.exports = app;
