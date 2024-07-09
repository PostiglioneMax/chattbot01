import { createServer } from "http";
import { Server } from "socket.io";
import { getWeather } from "./services/weatherService.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 3000;

const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", async (msg) => {
    if (msg.toLowerCase().includes("clima")) {
      socket.emit("bot reply", "¿En dónde?");
    } else if (msg.toLowerCase().includes("london")) {
      try {
        const weather = await getWeather("London");
        socket.emit("bot reply", `El clima en London es: ${weather}`);
      } catch (error) {
        socket.emit("bot reply", "Error obteniendo el clima.");
      }
    } else {
      socket.emit("bot reply", "No entiendo tu mensaje.");
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
