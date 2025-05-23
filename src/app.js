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
    origin: "https://pulsefy.mooo.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Access-Control-Allow-Origin"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Configuração do Helmet
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "unsafe-none" },
  })
);

// Middleware para debug de CORS
app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  console.log("Request Method:", req.method);
  console.log("Request Headers:", req.headers);
  next();
});

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

module.exports = app;
