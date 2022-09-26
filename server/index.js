import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import conectToMongo from "./database.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";

const app = express();
const PORT = process.env.PORT;

conectToMongo();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api/product", productRoute);
app.use("/api/user", userRoute);
app.use("/api/order", orderRoute);

app.listen(PORT, () => {
  console.log(`E-Commerce app listening to http://localhost:${PORT}`);
});
