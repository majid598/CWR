import express from "express";
import { allReviews, newReview } from "../Controllers/Review.js";

const router = express.Router();

router.post("/new", newReview);

router.get("/all", allReviews);

export default router;
