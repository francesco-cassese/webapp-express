import { createAgent } from "langchain";
import { z } from "zod";
import model from "../models/anthropic.js";

const responseFormat = z.object({
    choise: z.enum(['GENERIC', 'REVIEW', 'RECOMMENDATION']).describe('La scelta che hai valutato'),
    productName: z.string().optional().describe("Il nome del panino estratto dal messaggio, se presente"),
    subject: z.string().optional().describe("La materia di studio estratta, es: Matematica, Fisica")
})

const systemPrompt = `
Sei un Router intelligente di Pork-edotto. Il tuo unico compito è classificare la richiesta dell'utente:

1. 'REVIEW': Se l'utente cerca pareri, opinioni o info su un panino specifico.
2. 'RECOMMENDATION': Se l'utente menziona un ESAME, una MATERIA DI STUDIO o chiede un consiglio su "cosa mangiare" per studiare.
3. 'GENERIC': Saluti, orari o domande che non riguardano recensioni o consigli di studio.

Rispondi sempre e solo seguendo lo schema JSON richiesto.
`;


const routerAgent = createAgent({
    systemPrompt,
    model,
    responseFormat
})

export default routerAgent;