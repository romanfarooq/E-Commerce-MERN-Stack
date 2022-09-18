import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import conectToMongo from "./database.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";

const app = express();
const PORT = process.env.PORT;

conectToMongo();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);
app.use("/api/order", orderRoute);

app.listen(PORT, () => {
  console.log(`E-Commerce app listening to http://localhost:${PORT}`);
});