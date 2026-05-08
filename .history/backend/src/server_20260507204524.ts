import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRoutes from "./routes/auth.routes";
import errorHandler from "./middleware/errorHandler";
import LeaveRoutes from "./routes/leave.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "api ajillaj bn" });
});

app.use("/api/auth", AuthRoutes);
app.use("/api/leaves", LeaveRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server ${PORT} port deer aslaa`);
});
