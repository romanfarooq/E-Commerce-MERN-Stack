import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`E-Commerce app listening to http://localhost:${PORT}`);
});