import express from "express";
import { newSubscribe, postNews } from "../Controllers/Subscribe.js";

const router = express.Router();

router.post("/new", newSubscribe);

router.post("/news/post", postNews);

export default router;
