import express from "express";
import dotenv from "dotenv";
import AppDataSource from "./config/db";
import sensorDataRoutes from "./routes/sensorData";
import authRoutes from "./routes/auth";
import statsRoutes from "./routes/stats";
import camerasRoutes from "./routes/cameras";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();

// Create Express App
const app = express();
const httpServer = createServer(app); // HTTP server for socket.io

// Initialize Socket.io
const io = new Server(httpServer, {
	cors: {
		origin: "*", // Allow all origins
		methods: ["GET", "POST"],
	},
});

// Middleware
app.use(
	cors({
		origin: "*", // Allow all origins
	}),
);
app.use(express.json());

// Swagger Setup
const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Sensor API",
			version: "1.0.0",
			description:
				"API for managing sensor data, stats, cameras, and real-time communication.",
		},
		servers: [
			{
				url: "http://localhost:3002", // Update with your actual URL
			},
		],
	},
	apis: ["./src/routes/*.ts"], // Path to the API routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sensor-data", sensorDataRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/cameras", camerasRoutes);

// Socket.io Logic
io.on("connection", (socket) => {
	console.log("Client connected");

	// Emit data to the client
	socket.emit("data", {
		temp: 25.3,
		humidity: 40,
		co: 0.3,
		co2: 0.5,
		ammoniac: 0.2,
		water_level: 85,
		food_level: 90,
		boiler_average_weight: 2.5,
		critical_events: ["Fire detected", "Smoke alarm triggered"],
		growth_index: {
			average_weight: 2.3,
			weight_growth_rate: 1.1,
		},
		healthandwelfare: {
			disease: true,
			daily_morality: 5,
			chicken_activity: "normal", // Enum
			vaccination: ["H5N1"],
			chicken_voice: "normal",
			not_drinking_or_eating: false,
		},
		resources: {
			carbon_footprint: 25,
			electricity: 150,
			water: 300,
			gas: 120,
			food: 500,
		},
	});

	// Handle disconnects
	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});

// Initialize TypeORM
AppDataSource.initialize()
	.then(() => {
		console.log("Database connected");
	})
	.catch((error) => {
		console.error("Database connection failed", error);
	});

// Export both the app and server
export { app, httpServer };
