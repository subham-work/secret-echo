import Message from "../models/Message";
import { Request, Response } from "express";

const aiResponses = [
  "Hello!",
  "How can I help?",
  "Interesting!",
  "Tell me more.",
];

export const getMessages = async (req: any, res: Response) => {
  const messages = await Message.find({ userId: req.user.id });
  res.json(messages);
};

export const sendMessage = async (req: any, res: Response) => {
  const { text } = req.body;

  const userMsg = await Message.create({
    sender: "user",
    text,
    userId: req.user.id,
  });

  const aiText = aiResponses[Math.floor(Math.random() * aiResponses.length)];

  const aiMsg = await Message.create({
    sender: "ai",
    text: aiText,
    userId: req.user.id,
  });

  const io = req.app.get("io");
  io.to(req.user.id).emit("newMessage", userMsg);
  io.to(req.user.id).emit("newMessage", aiMsg);

  res.status(201).json({ userMsg, aiMsg });
};
