import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import quizRoutes from "./routes/quizRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/quizzes", quizRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
