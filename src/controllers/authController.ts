import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import AppDataSource from "../config/db";
import { User } from "../models/userModel";

const userRepository = AppDataSource.getRepository(User);

// Signup
export const signup = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		// Check if user already exists
		const existingUser = await userRepository.findOne({ where: { email } });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create new user
		const user = userRepository.create({ email, password: hashedPassword });
		await userRepository.save(user);

		res.status(201).json({ message: "User created successfully" });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

// Login
export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		// Find user
		const user = await userRepository.findOne({ where: { email } });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Check password
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		// Generate token
		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
			expiresIn: "10h",
		});

		res.status(200).json({ token });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};
