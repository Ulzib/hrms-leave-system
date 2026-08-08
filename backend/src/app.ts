import express from "express";
import cors from "cors";
import AuthRoutes from "./routes/auth.routes";
import errorHandler from "./middleware/errorHandler";
import LeaveRoutes from "./routes/leave.routes";
import AdminRoutes from "./routes/admin.routes";

const app = express();

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
app.use(cors({ origin: frontendUrl }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "api ajillaj bn" });
});

app.use("/api/auth", AuthRoutes);
app.use("/api/leave", LeaveRoutes);
app.use("/api/admin", AdminRoutes);

app.use(errorHandler);

export default app;
