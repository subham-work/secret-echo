import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { connectDB } from "./config/db";
import { setupSocket } from "./socket";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_END_ORIGIN_URL,
    credentials: true,
  },
});

app.set("io", io);
setupSocket(io);

connectDB().then(() => {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
