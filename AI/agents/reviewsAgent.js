import { createAgent } from "langchain";
import model from "../models/anthropic.js";
import getReviewsTool from "../tools/reviewTools.js";
import searchProductsTool from "../tools/searchProductTools.js";

const systemPrompt = `
Sei l'esperto di recensioni di Pork-edotto. 

REGOLE FERREE:
1. Se il nome del prodotto è presente e certo, usa 'get_reviews' per recuperare le recensioni.
2. Se il nome del prodotto è AMBIGUO, MANCANTE o GENERICO (es. "porchetta"), 
   DEVI usare SEMPRE il tool 'search_products' per trovare i nomi esatti.
3. Se 'search_products' ti restituisce più risultati, elenca i prodotti trovati e chiedi all'utente quale intende.
4. NON inventare mai recensioni.
5. Se le recensioni non sono disponibili per il prodotto scelto, sii onesto e offri di cercare qualcos'altro.
`;

const reviewsAgent = createAgent({
    systemPrompt,
    model,
    tools: [getReviewsTool, searchProductsTool]
});

export default reviewsAgent;