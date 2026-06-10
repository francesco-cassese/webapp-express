import {express} from 'express';
import { indexProducts } from '../controllers/productsControllers.js';

const productRouter = express.Router();

//index
productRouter.get("/", indexProducts);

//show


export default productRouter;