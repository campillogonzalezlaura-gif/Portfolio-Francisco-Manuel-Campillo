import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser middleware
  app.use(express.json());

  // --- API ROUTES ---
  
  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Server is running" });
  });

  // Example: Contact Form API
  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    
    console.log("Nuevo mensaje recibido:", { name, email, message });
    
    // Aquí podrías enviar un email o guardar en una base de datos
    // Por ahora, solo simulamos éxito
    res.status(200).json({ 
      success: true, 
      message: "Mensaje recibido correctamente. ¡Gracias!" 
    });
  });

  // Example: Portfolio data API
  app.get("/api/profile", (req, res) => {
    res.json({
      name: "Francisco Manuel Campillo Díaz",
      role: "Contramaestre Eléctrico",
      company: "ACCIONA"
    });
  });

  // --- VITE MIDDLEWARE ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
