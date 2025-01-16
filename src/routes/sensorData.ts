import express from "express";
import {
	createSensorData,
	getAllSensorData,
} from "../controllers/sensorDataController";
import { authGuard } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /api/sensor-data:
 *   post:
 *     summary: Create new sensor data
 *     tags: [SensorData]
 *     security:
 *       - BearerAuth: []  # Token-based authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               temperature:
 *                 type: number
 *                 example: 23.5
 *               ammonia:
 *                 type: number
 *                 example: 0.2
 *               co:
 *                 type: number
 *                 example: 0.3
 *               co2:
 *                 type: number
 *                 example: 0.5
 *     responses:
 *       201:
 *         description: Sensor data created successfully
 *       500:
 *         description: Internal server error
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Specify JWT token type
 */
router.post("/", authGuard, createSensorData);

/**
 * @swagger
 * /api/sensor-data:
 *   get:
 *     summary: Get all sensor data
 *     tags: [Sensor Data]
 *     security:
 *       - BearerAuth: []  # Token-based authentication
 *     responses:
 *       200:
 *         description: Sensor data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   temperature:
 *                     type: number
 *                     example: 25.3
 *                   ammonia:
 *                     type: number
 *                     example: 5.0
 *                   co:
 *                     type: number
 *                     example: 0.2
 *                   co2:
 *                     type: number
 *                     example: 400.0
 *       500:
 *         description: Internal server error
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

router.get("/", authGuard, getAllSensorData);

export default router;
