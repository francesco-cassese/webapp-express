import express from 'express';
import { gestisciChat } from '../controllers/anthropicController.js';

const router = express.Router();

router.post('/chat', gestisciChat);

export default router;