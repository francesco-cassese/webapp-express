import express from 'express';
import { indexProduct, showProduct } from '../controllers/productsControllers.js';
import { IndexReviewsProduct } from '../controllers/reviewsControllers.js';

const productRouter = express.Router();

//index
productRouter.get("/", indexProduct);

//show
productRouter.get("/:id", showProduct)

// Product reviews
// GET /products/:id/reviews
productRouter.get("/:id/reviews", IndexReviewsProduct);

export default productRouter;