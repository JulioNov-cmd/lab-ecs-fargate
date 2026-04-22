const express = require("express");
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 3000;

// 🔐 Quitar fingerprinting desde el inicio
app.disable("x-powered-by");

// 🔐 Seguridad base
app.use(helmet());

// 🔐 Hardening avanzado (ZAP clean)
app.use((req, res, next) => {

  // Cache control
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  // Protección básica
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // CSP mejorado
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  );

  // Permissions Policy
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()"
  );

  // Cross-Origin policies
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");

  next();
});

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>ECS Fargate Lab</title>
      <style>
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .container {
          text-align: center;
        }
        h1 {
          font-size: 3em;
          margin-bottom: 10px;
        }
        p {
          font-size: 1.2em;
          color: #ccc;
        }
        .badge {
          margin-top: 20px;
          padding: 10px 20px;
          border-radius: 20px;
          background: #00c853;
          color: black;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 Laboratorio Julio y Aldo</h1>
        <h1>Vamos empezando</h1>
        <p>CI/CD funcionando con GitHub Actions + OIDC</p>
        <p>Deploy automático en AWS</p>
        <div class="badge">Deployment OK</div>
      </div>
    </body>
    </html>
  `);
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "ecs-fargate-lab",
    timestamp: new Date().toISOString()
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`App listening on port ${port}`);
});
