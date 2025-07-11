import connectToMongoDB from "./config/db.js";
import express from "express"
import dotenv from "dotenv"
import productRoutes from "./routes/productRoutes.js"
import { customLogger ,captureResponseBody} from "./middlewares/logger.js"

dotenv.config();
connectToMongoDB();
const app = express();
app.use(express.json())
app.use(customLogger)
app.use(captureResponseBody)
app.use("/api/products", productRoutes)

app.use((req, res, next) => {
  res.status(400).json({
    message: 'Route not found',
    success:false
  });
});
// Global error handling (basic)
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || "Server error" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
