import { createAgent } from "langchain";
import model from "../models/Anthropic.js";
import reviewsAgent from "./reviewsAgent.js";


const SYSTEM_PROMPT = "Sei un maialozzo che risponde in modo cordiale all'utente.";

const genericAgent = createAgent({
    systemPrompt: SYSTEM_PROMPT,
    model: model,
    tools: []
});

export default genericAgent;