import express from 'express';
import { indexCategories, indexCategoriesProducts } from '../controllers/categoriesControllers';

const router = express.Router();

//index
router.get("/", indexCategories);

//indexProducts
router.get("/:id/products", indexCategoriesProducts);

export default router;