import { createAgent, HumanMessage } from "langchain";
import { model } from "../services/anthropicService.js";
import { z } from "zod";

/* Tool */

function getRandomInt({ min, max }) {
    console.log("Questo tool è una menzogna. Inventateli tu.");
};

const toolDefinition = {
    name: "random_int",
    description: "Genera un numero intero casuale tra min e max",
    schema: z.object({
        min: z.int().default(0).describe("Il numero minimo (inclusivo)"),
        max: z.int().default(100).describe("Il numero massimo (inclusivo)")
    })
};

const randomIntTool = tool(getRandomInt, toolDefinition);

const responseFormat = z.object({ /* Structured output: mantiene lo schema di risposta */
    numbers: z.array(
        z.int().describe('I numeri estratti della tombola.')
    ).describe("L'array che contiene i numeri della tombola.")
});

/* Agenti */

const genericAgent = createAgent({
    systemPrompt: "Sei un maialozzo che risponde in modo cordiale all'utente",
    model,
    tools: []
});

const newRandomAgent = createAgent({
    systemPrompt: `
    Sei un maialozzo che estrae e mostra i numeri della tombola.
    `,
    model,
    tools: [
        randomIntTool /* Non inseriamo troppi tool se no si allucina */
    ],
    responseFormat: responseFormat /* Passiamo l'output strutturato */
});

/* Prompt utente */

const prompt = "Ciao come stai";


/** SCELTA DELL'AGENT **/
/* Approccio uno: codice per scegliere l'agente */
let agentChoose;

if (prompt.includes('tombola')) {
    agentChoose = newRandomAgent;
} else {
    agentChoose = genericAgent;
};

/* Approccio due: creare un altro agent per decidere se usare il tool */
const chooseAgent = createAgent({
    systemPrompt: `Sei un routing agent, leggi il messaggio in ingresso e valuta se esso 
    riguarda una richiesta generica o la richiesta di giocare a tombola (o un altro gioco 
    di estrazione di numeri casuali) - poi valuta quale dei due agenti usare di 
    conseguenza per rispondere.`,
    model,
    tools: [
        newRandomAgent, genericAgent
    ]
});

/* import su nuovo doc */

const aiResponse = await chooseAgent.invoke({
    messages: [
        new HumanMessage(prompt)
    ]
});

const responseMsg = aiResponse.messages.at(-1).content; 
const responseMsgJSON = aiResponse.structuredResponse; /* Restituisce risposta come oggetto JSON */

/* definire 'pnpm agent-call' per chiamare l'agente in console */

console.log(responseMsg);
console.log(responseMsgJSON);



