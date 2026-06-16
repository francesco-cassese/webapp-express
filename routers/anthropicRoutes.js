import express from 'express';
import { gestisciChat } from '../AI/controller/anthropicController.js'

const router = express.Router();

router.post('/chat', gestisciChat);

export default router;