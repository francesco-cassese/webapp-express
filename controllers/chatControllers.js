import { HumanMessage } from "langchain";
import routerAgent from "../ai/agents/routingAgent.js";
import genericAgent from "../ai/agents/genericAgent.js";
import reviewsAgent from "../ai/agents/reviewsAgent.js";
import recommendationAgent from "../ai/agents/recommendationAgent.js";

const handleChat = async (request, response) => {
    try {
        const { message } = request.body;

        if (!message) {
            return response.status(400).json({
                success: false,
                error: "Message is required in the request body."
            });
        }

        const routerResponse = await routerAgent.invoke({
            messages: [new HumanMessage(message)]
        });

        const { choise } = routerResponse.structuredResponse;

        let agentToInvoke;

        if (choise === 'REVIEW') {
            agentToInvoke = reviewsAgent;
        }
        else if (choise === 'RECOMMENDATION') {
            agentToInvoke = recommendationAgent;
        }
        else {
            agentToInvoke = genericAgent;
        }

        let contentToInvoke = message;

        if (choise === 'REVIEW') {
            contentToInvoke = `L'utente sta chiedendo recensioni per: "${message}". 
            Usa sempre il tool 'search_products' se il nome del prodotto non è assolutamente certo o se ci sono più prodotti simili.`;
        }

        const finalAgentResponse = await agentToInvoke.invoke({
            messages: [new HumanMessage(contentToInvoke)]
        });

        const responseMsg = finalAgentResponse.messages.at(-1).content;

        return response.status(200).json({
            success: true,
            data: responseMsg
        });

    } catch (error) {
        console.error("Error in chat controller:", error);

        return response.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export default handleChat;