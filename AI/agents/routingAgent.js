import { createAgent } from "langchain";
import { z } from "zod";
import model from "../models/anthropic.js";

const responseFormat = z.object({
    choise: z.enum(['GENERIC', 'REVIEW', 'RECOMMENDATION', 'NAVIGATION']).describe('La scelta che hai valutato'),

    productName: z.string().describe("Il nome del panino O della pagina del sito richiesti"),
    subject: z.string().optional().describe("La materia di studio estratta, es: Matematica, Fisica")
})

const systemPrompt = `
Sei un Router intelligente di Pork-edotto. Il tuo unico compito è classificare la richiesta dell'utente:

1. 'NAVIGATION': Se l'utente vuole visitare una pagina del sito. Questo include:
   - Andare a vedere un prodotto specifico (es: "fammi vedere il panino...")
   - Visitare sezioni del sito (es: "vai al menu", "apri la pagina delle recensioni", "chi siamo", "torna alla home").

2. 'REVIEW': Se l'utente cerca pareri, opinioni o info su un panino specifico.
3. 'RECOMMENDATION': Se l'utente menziona un ESAME, una MATERIA DI STUDIO o chiede un consiglio su "cosa mangiare" per studiare.
4. 'GENERIC': Saluti, orari o domande che non riguardano recensioni, consigli di studio o navigazione prodotti.
5. IMPORTANTE: Se la scelta è 'NAVIGATION', il campo 'productName' deve essere SEMPRE popolato con il nome del prodotto o della sezione richiesta. Non lasciarlo mai vuoto.

Rispondi sempre e solo seguendo lo schema JSON richiesto.
`;


const routerAgent = createAgent({
    systemPrompt,
    model,
    responseFormat
})

export default routerAgent;