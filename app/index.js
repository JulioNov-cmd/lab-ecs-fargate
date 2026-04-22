const express = require("express");
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(helmet());

// 🔐 Middleware de Hardening (ZAP clean)
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  );
  res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>DevSecOps Dashboard | Julio & Aldo</title>
      <style>
        :root {
          --neon-green: #00ff41;
          --dark-bg: #0d0208;
          --panel-bg: rgba(0, 255, 65, 0.05);
        }
        body {
          margin: 0;
          padding: 0;
          font-family: 'Courier New', Courier, monospace;
          background-color: var(--dark-bg);
          color: var(--neon-green);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          overflow: hidden;
        }
        .matrix-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), 
                      repeating-linear-gradient(0deg, transparent 0, transparent 1px, #001a00 1px, #001a00 2px);
          z-index: -1;
        }
        .dashboard {
          border: 2px solid var(--neon-green);
          padding: 40px;
          background: var(--panel-bg);
          box-shadow: 0 0 20px rgba(0, 255, 65, 0.2);
          text-align: center;
          max-width: 600px;
          position: relative;
        }
        .dashboard::before {
          content: "SYSTEM_STATUS: SECURE";
          position: absolute;
          top: -12px;
          left: 20px;
          background: var(--dark-bg);
          padding: 0 10px;
          font-size: 0.8em;
          letter-spacing: 2px;
        }
        h1 {
          font-size: 2.5em;
          text-transform: uppercase;
          margin: 0;
          letter-spacing: 5px;
          text-shadow: 0 0 10px var(--neon-green);
        }
        .status-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 30px;
        }
        .status-item {
          border: 1px solid rgba(0, 255, 65, 0.3);
          padding: 15px;
          background: rgba(0,0,0,0.5);
        }
        .label { font-size: 0.7em; color: rgba(0, 255, 65, 0.6); display: block; margin-bottom: 5px; }
        .value { font-size: 1.1em; font-weight: bold; }
        .blink { animation: blinker 1.5s linear infinite; }
        @keyframes blinker { 50% { opacity: 0; } }
        .footer { margin-top: 30px; font-size: 0.8em; opacity: 0.7; }
      </style>
    </head>
    <body>
      <div class="matrix-bg"></div>
      <div class="dashboard">
        <h1>COMMAND CENTER</h1>
        <p class="blink">> ACCESS GRANTED: JULIO & ALDO</p>
        
        <div class="status-grid">
          <div class="status-item">
            <span class="label">INFRASTRUCTURE</span>
            <span class="value">AWS FARGATE</span>
          </div>
          <div class="status-item">
            <span class="label">PIPELINE</span>
            <span class="value">GHA + OIDC</span>
          </div>
          <div class="status-item">
            <span class="label">SECURITY</span>
            <span class="value">TRIVY + ZAP</span>
          </div>
          <div class="status-item">
            <span class="label">ENVIRONMENT</span>
            <span class="value">PRODUCTION</span>
          </div>
        </div>

        <div class="footer">
          [ DEPLOY_ID: ${Math.random().toString(36).substring(7).toUpperCase()} ]
        </div>
      </div>
    </body>
    </html>
  `);
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "ecs-fargate-lab", timestamp: new Date().toISOString() });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`App listening on port ${port}`);
});