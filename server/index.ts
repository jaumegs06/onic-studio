import { createServer } from "http";
import { app } from "./app.js";

async function startServer() {
  const server = createServer(app);
  const port = process.env.PORT || 5000;

  server.listen(port, () => {
    console.log(`API Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
