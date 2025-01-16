import { Request, Response } from "express";

export const getStats = async (req: Request, res: Response) => {
	try {
		// Replace these with actual data retrieval logic
		const stats = {
			nbBatiments: 10,
			nbChickens: 2000,
			nbCameras: 5,
			infectedChickens: 15,
		};

		res.status(200).json(stats);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};
