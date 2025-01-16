import { DataSource } from "typeorm";
import { SensorData } from "../models/sensorDataModel";
import { User } from "../models/userModel";

const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST || "localhost",
	port: parseInt(process.env.DB_PORT || "5432", 10),
	username: process.env.DB_USER || "postgres",
	password: process.env.DB_PASSWORD || "password",
	database: process.env.DB_NAME || "sensordb",
	synchronize: true, // Use true only for development
	logging: false,
	entities: [SensorData, User],
});

export default AppDataSource;
