import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.routes.js"
import { requireAuth } from "./src/middleware/requireAuth.js";
import restaurantRoutes from "./src/routes/restaurant.routes.js";
import productRoutes from "./src/routes/product.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/admin", adminRoutes);
app.get("/", (req, res) =>{
  res.json({
    message: "Ecobite V1 API",
    user: req.user
  })
})

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});