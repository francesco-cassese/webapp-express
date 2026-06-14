// controllers/anthropicController.js
import { messaggiaClaude } from '../services/anthropicService.js';

export const gestisciChat = async (req, res) => {
    try {
        const { messaggio } = req.body;

        if (!messaggio) {
            return res.status(400).json({
                success: false,
                message: "Messaggio mancante nel corpo della richiesta."
            });
        }

        const risposta = await messaggiaClaude(messaggio);

        res.status(200).json({
            success: true,
            data: risposta.content
        });

    } catch (error) {
        console.error("Errore nel controller:", error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};