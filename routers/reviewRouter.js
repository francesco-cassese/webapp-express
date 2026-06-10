import express from "express";
<<<<<<< HEAD
import { updateReview, showReview, deleteReview } from "../controllers/reviewsControllers.js";
=======
import { updateReview, showReview, createReview } from "../controllers/reviewsControllers.js";
import validateReview from "../middlewares/validateReviews.js";
>>>>>>> 202e0ba368e8a0238d91c6bcad902fc32da755b9

const reviewRouter = express.Router();

// Index:

// Show:
reviewRouter.get("/:id", showReview);
//Create:
reviewRouter.post("/", [validateReview, createReview])
//Update:
reviewRouter.put("/:id", updateReview);

//Delete:
reviewRouter.delete('/:id', deleteReview);

export default reviewRouter;