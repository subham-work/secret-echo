import User from "../models/User";
import { Request, Response } from "express";
import { generateToken } from "../config/jwt";

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "User exists" });

  const user = await User.create({ email, password });
  res.json({ token: generateToken(user._id), userId: user._id });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });

  res.json({ token: generateToken(user._id), userId: user._id });
};
