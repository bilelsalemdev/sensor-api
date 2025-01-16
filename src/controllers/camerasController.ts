import { Request, Response } from "express";

export const getCameras = async (req: Request, res: Response) => {
	try {
		// Replace these with actual data retrieval logic
		const cameras = {
			url_normal: "http://example.com/normal",
			object_detection_url: "http://example.com/object-detection",
			anomaly_detection_url: "http://example.com/anomaly-detection",
		};

		res.status(200).json(cameras);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};
