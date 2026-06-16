import { createAgent } from "langchain";
import { z } from "zod";
import model from "../models/anthropic.js";

const responseFormat = z.object({
    choise: z.enum(['GENERIC', 'REVIEW']).describe('La scelta che hai valutato'),
    productName: z.string().optional().describe("Il nome del panino estratto dal messaggio, se presente")
})

const systemPrompt = `
Sei un Router intelligente di Pork-edotto. Il tuo unico compito è classificare la richiesta dell'utente in una di queste due categorie:

1. 'REVIEW': Se l'utente chiede recensioni, opinioni, pareri su un prodotto, o se sta cercando informazioni specifiche su un panino del menu.
2. 'GENERIC': Se l'utente sta solo salutando, facendo domande generiche sull'orario, sul locale, o conversazioni di cortesia che non richiedono di consultare il database delle recensioni.

Analizza il messaggio dell'utente e rispondi strettamente seguendo lo schema JSON richiesto.
`;


const routerAgent = createAgent({
    systemPrompt,
    model,
    responseFormat
})

export default routerAgent;