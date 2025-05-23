const http = require("http");
const https = require("https");
const fs = require("fs");
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

// Create HTTP server
const httpServer = http.createServer(app);
httpServer.listen(PORT, () => {
  console.log(`HTTP Server running on port ${PORT}`);
});

// If SSL certificates exist, create HTTPS server
try {
  const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/api.pulsefy.mooo.com/privkey.pem",
    "utf8"
  );
  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/api.pulsefy.mooo.com/cert.pem",
    "utf8"
  );
  const ca = fs.readFileSync(
    "/etc/letsencrypt/live/api.pulsefy.mooo.com/chain.pem",
    "utf8"
  );

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };

  const httpsServer = https.createServer(credentials, app);

  // Handle CORS preflight requests
  httpsServer.on("request", (req, res) => {
    if (req.method === "OPTIONS") {
      res.writeHead(204, {
        "Access-Control-Allow-Origin": "https://pulsefy.mooo.com",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": "86400",
      });
      res.end();
      return;
    }
  });

  httpsServer.listen(443, () => {
    console.log("HTTPS Server running on port 443");
  });
} catch (error) {
  console.log("SSL certificates not found. HTTPS server not started.");
  console.log("Error:", error.message);
}
