import express from "express";
import { updateReview, showReview, createReview } from "../controllers/reviewsControllers.js";

const reviewRouter = express.Router();

// Index:

// Show:
reviewRouter.get("/:id", showReview);
//Create:
reviewRouter.post("/", createReview)
//Update:
reviewRouter.put("/:id", updateReview);

//Delete:

export default reviewRouter;