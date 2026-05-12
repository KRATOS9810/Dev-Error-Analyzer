import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import route from "./routes.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", route);
app.listen(2005, () => {
  console.log("Listening");
});
