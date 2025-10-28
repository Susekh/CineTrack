import dotenv from "dotenv"
import {server} from "./app.js"

dotenv.config();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT ?? 5000}`);
});