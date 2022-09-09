import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import conectToMongo from "./database.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();
const PORT = process.env.PORT;

conectToMongo();

app.use(express.json());
app.use(cookieParser());
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

app.listen(PORT, () => {
  console.log(`E-Commerce app listening to http://localhost:${PORT}`);
});