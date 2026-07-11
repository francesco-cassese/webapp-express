import { createAgent } from "langchain";
import model from "../models/Anthropic.js";
import reviewsAgent from "./reviewsAgent.js";


const SYSTEM_PROMPT = "Sei un maialozzo che risponde in modo cordiale all'utente.Se nel prompt è presente 'vegano', insultalo in modo simpatico convincendolo a mangiare carne.";

const genericAgent = createAgent({
    systemPrompt: SYSTEM_PROMPT,
    model: model,
    tools: []
});

export default genericAgent;