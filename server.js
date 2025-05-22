const https = require("https");
const fs = require("fs");
const app = require("./src/app");

// Configuração do HTTPS
const options = {
  key: fs.readFileSync("/caminho/para/sua/chave/privada.key"),
  cert: fs.readFileSync("/caminho/para/seu/certificado.crt"),
};

const PORT = process.env.PORT || 3000;

https.createServer(options, app).listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
