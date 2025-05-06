import request from "supertest";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "../routes/authRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || "", {});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth Routes", () => {
  const testUser = {
    email: `testuser${Math.floor(Math.random() * 999)}@gmail.com`,
    password: "testpass123",
  };

  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/signup").send(testUser);
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("should not register same user twice", async () => {
    const res = await request(app).post("/api/auth/signup").send(testUser);
    expect(res.statusCode).toBe(400);
  });

  it("should login successfully", async () => {
    const res = await request(app).post("/api/auth/login").send(testUser);
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("should fail login with wrong password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: "wrongpass",
    });
    expect(res.statusCode).toBe(401);
  });
});
