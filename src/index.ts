import { httpServer } from "./app";
import "reflect-metadata";

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
