import { Request, Response } from "express";
import { SensorData } from "../models/sensorDataModel";
import AppDataSource from "../config/db";

const sensorDataRepository = AppDataSource.getRepository(SensorData);

export const createSensorData = async (req: Request, res: Response) => {
	try {
		const { temperature, ammonia, co, co2 } = req.body;
		const data = sensorDataRepository.create({ temperature, ammonia, co, co2 });
		await sensorDataRepository.save(data);
		res.status(201).json(data);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const getAllSensorData = async (req: Request, res: Response) => {
	try {
		const data = await sensorDataRepository.find();
		res.status(200).json(data);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};
