import express from "express";
import dotenv from "dotenv";
import AppDataSource from "./config/db";
import sensorDataRoutes from "./routes/sensorData";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/sensor-data", sensorDataRoutes);

// initialize typeorm
AppDataSource.initialize()
	.then(() => {
		console.log("Database connected");
	})
	.catch((error) => {
		console.error("Database connection failed", error);
	});

export default app;
