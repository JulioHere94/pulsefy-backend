const http = require("http");
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

// Create HTTP server
const httpServer = http.createServer(app);
httpServer.listen(PORT, () => {
  console.log(`HTTP Server running on port ${PORT}`);
});
