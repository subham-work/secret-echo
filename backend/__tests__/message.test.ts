import request from "supertest";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "../routes/authRoutes";
import messageRoutes from "../routes/messageRoutes";
import Message from "../models/Message";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

let token: string;
let userId: string;

// Mock the Socket.io server
const mockIo = {
  to: jest.fn().mockReturnThis(),
  emit: jest.fn(),
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || "", {});

  const user = {
    email: `messageuser${Math.floor(Math.random() * 1000)}@gmail.com`,
    password: "testpass123",
  };

  await request(app).post("/api/auth/signup").send(user);
  const res = await request(app).post("/api/auth/login").send(user);
  token = res.body.token;
  const decodedToken: any = jwt.decode(token);
  userId = decodedToken.id;

  // Mock the io instance to be passed in the request
  app.set("io", mockIo);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Message Controller", () => {
  it("should send a message and get an AI response", async () => {
    const res = await request(app)
      .post("/api/messages")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Hello AI" });

    expect(res.statusCode).toBe(201);
    expect(res.body.userMsg.text).toBe("Hello AI");
    expect(res.body.userMsg.sender).toBe("user");
    expect(res.body.aiMsg.sender).toBe("ai");

    // Verify that the emit method of the mocked io was called
    expect(mockIo.to).toHaveBeenCalledWith(userId);
    expect(mockIo.emit).toHaveBeenCalledTimes(2); // 2 emit calls for user and AI messages
  });

  it("should fetch messages", async () => {
    const res = await request(app)
      .get("/api/messages")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1); // Should return at least the AI and user messages
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app).get("/api/messages");
    expect(res.statusCode).toBe(401);
  });

  it("should return 401 for invalid token", async () => {
    const res = await request(app)
      .get("/api/messages")
      .set("Authorization", `Bearer invalid_token`);
    expect(res.statusCode).toBe(401);
  });
});
