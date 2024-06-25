import express from "express";
import { newSubscribe } from "../Controllers/Subscribe.js";

const router = express.Router();

router.post("/new", newSubscribe);

export default router;
