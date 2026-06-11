import express from "express";
import { updateReview, showReview, createReview, deleteReview, indexReviews } from "../controllers/reviewsControllers.js";
import validateReview from "../middlewares/validateReviews.js";


const reviewRouter = express.Router();

// Index:
reviewRouter.get("/", indexReviews);
// Show:
reviewRouter.get("/:id", showReview);
//Create:
reviewRouter.post("/", [validateReview, createReview])
//Update:
reviewRouter.put("/:id", updateReview);

//Delete:
reviewRouter.delete('/:id', deleteReview);

export default reviewRouter;