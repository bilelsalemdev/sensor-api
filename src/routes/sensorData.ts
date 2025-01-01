import express from "express";
import {
	createSensorData,
	getAllSensorData,
} from "../controllers/sensorDataController";

const router = express.Router();

router.post("/", createSensorData);
router.get("/", getAllSensorData);

export default router;
