import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();

dotenv.config({
  path: "./.env",
});
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      process.env.CLIENT_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server Working");
});

import { dbConnect } from "./utils/Db.js";

import subscriberRoute from "./Routes/Subscribe.js";
import blogRoute from "./Routes/Blog.js";
import reviewRoute from "./Routes/Review.js";
import { errorMiddleware } from "./Middlewares/Error.js";

dbConnect(process.env.MONGO_URI);

app.use("/api/v1/subscribe", subscriberRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/review", reviewRoute);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running at port number:${PORT}`);
});
