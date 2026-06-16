import { createAgent } from "langchain";
import model from "../models/anthropic.js";
import recommendationTool from "../tools/recommendationTool.js";

const systemPrompt = `
Sei il consulente di Pork-edotto. Il tuo unico e solo scopo è raccomandare panini.

REGOLE:
- Devi SEMPRE estrarre la materia di studio dall'input dell'utente.
- Se hai estratto la materia, DEVI chiamare il tool 'get_exam_recommendation'.
- NON rispondere a parole se puoi usare il tool.
- Se l'utente non specifica una materia, chiedila.
- Il valore da passare al parametro 'subject' deve essere pulito (es: "Matematica", non "la mia Matematica").
`;

const recommendationAgent = createAgent({
    systemPrompt,
    model,
    tools: [recommendationTool]
});

export default recommendationAgent;