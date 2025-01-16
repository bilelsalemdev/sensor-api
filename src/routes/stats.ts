import express from "express";
import { getStats } from "../controllers/statsController";
import { authGuard } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Get system statistics
 *     tags: [Stats]
 *     security:
 *       - BearerAuth: []  # Token-based authentication
 *     responses:
 *       200:
 *         description: Statistics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nbBatiments:
 *                   type: integer
 *                   example: 5
 *                 nbChickens:
 *                   type: integer
 *                   example: 1500
 *                 nbCameras:
 *                   type: integer
 *                   example: 20
 *                 infectedChickens:
 *                   type: integer
 *                   example: 10
 *       500:
 *         description: Internal server error
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

router.get("/", authGuard, getStats);

export default router;
