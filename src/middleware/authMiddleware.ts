import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
		if (!token) {
			return res.status(401).json({ error: "Unauthorized: No token provided" });
		}

		const secretKey = process.env.JWT_SECRET || "yourSecretKey"; // Use your secret key
		const decoded = jwt.verify(token, secretKey);

		// Attach user info to the request
		(req as any).user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({ error: "Unauthorized: Invalid token" });
	}
};
