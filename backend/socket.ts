import { Server } from "socket.io";

export const setupSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (userId: string) => {
      console.log("User join:", userId);
      socket.join(userId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
