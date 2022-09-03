import express from "express";
import "dotenv/config";
import conectToMongo from "./database.js";
import productRoute from "./routes/productRoute.js"

const app = express();
const PORT = process.env.PORT;

conectToMongo();

app.use(express.json());
app.use("/api/v1", productRoute)

app.listen(PORT, () => {
  console.log(`E-Commerce app listening to http://localhost:${PORT}`);
});