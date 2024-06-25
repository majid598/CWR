import express from "express";
import { allBlogs, newBlog, singleBlog } from "../Controllers/Blog.js";

const router = express.Router();

router.post("/new", newBlog);

router.get("/all", allBlogs);

router.get("/:id", singleBlog);

export default router;
