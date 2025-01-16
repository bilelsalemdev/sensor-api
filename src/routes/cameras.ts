import express from "express";
import { getCameras } from "../controllers/camerasController";
import { authGuard } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /api/cameras:
 *   get:
 *     summary: Get camera information
 *     tags: [Cameras]
 *     security:
 *       - BearerAuth: []  # Defines the use of a bearer token for authorization
 *     responses:
 *       200:
 *         description: Camera information fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url_normal:
 *                   type: string
 *                   example: "http://example.com/normal"
 *                 object_detection_url:
 *                   type: string
 *                   example: "http://example.com/object-detection"
 *                 anomaly_detection_url:
 *                   type: string
 *                   example: "http://example.com/anomaly-detection"
 *       500:
 *         description: Internal server error
 * components:
 *   securitySchemes:
 *     BearerAuth:  # Define the security scheme
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Specify that it's a JWT token
 */

router.get("/", authGuard, getCameras);

export default router;
