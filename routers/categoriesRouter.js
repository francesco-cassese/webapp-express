import express from 'express';
import { indexCategories, indexCategoriesProducts } from '../controllers/categoriesControllers.js';

const categoriesRouter = express.Router();

//index
categoriesRouter.get("/", indexCategories);

//indexProducts
categoriesRouter.get("/:id/products", indexCategoriesProducts);

export default categoriesRouter;