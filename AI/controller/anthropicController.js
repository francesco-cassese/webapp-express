// controllers/anthropicController.js
import { messaggiaClaude } from '../services/anthropicService.js';
import connection from '../../config/database.js';

export const gestisciChat = async (request, response) => {
    try {
        const { messaggio } = request.body;

        if (!messaggio) {
            return res.status(400).json({
                success: false,
                message: "Messaggio mancante nel corpo della richiesta."
            });
        }


        const [catalog] = await connection.execute(`
             SELECT 
                c.name AS category_name,
                p.name AS product_name,
                p.description AS product_description,
                p.price
            FROM categories c
            JOIN product_category pc ON c.id = pc.category_id
            JOIN products p ON pc.product_id = p.id`);

        const catalogStringify = JSON.stringify(catalog);

        const systemPrompt = `Sei Pork-instein, la mascotte di Pork-edotto, un ristorante il cui genio del gusto, simpatico e scientifico, aiuta gli studenti affamati pre-esame.
                              Ecco l'elenco completo del menu, con le categorie e i piatti disponibili associati:
                              ${catalogStringify}

                              Il tuo compito fondamentale è consigliare il panino/piatto perfetto tratto da questo elenco in base all'ansia o al tipo di esame che lo studente deve affrontare (esami lunghi, orali, a crocette, ecc.). Spiega scientificamente perché quel piatto è ideale.
                              Rispondi in modo brillante, chiaro e usando qualche termine culinario. Prima di dare qualsiasi consiglio accogli il cliente.
                              Se per caso ti arriva la parola "vegano" insultalo gentilmente.`

        const risposta = await messaggiaClaude(messaggio, systemPrompt);

        response.status(200).json({
            success: true,
            data: risposta.content
        });

    } catch (error) {
        console.error("Errore nel controller:", error);
        response.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};