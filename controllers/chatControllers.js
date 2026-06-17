import { HumanMessage } from "langchain";
import routerAgent from "../ai/agents/routingAgent.js";
import genericAgent from "../ai/agents/genericAgent.js";
import reviewsAgent from "../ai/agents/reviewsAgent.js";
import recommendationAgent from "../ai/agents/recommendationAgent.js";
import goToProductTool from "../ai/tools/navigationTool.js";
import { sendTextResponse } from "../utility/utilitydb.js";

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


        const { choise, productName } = routerResponse.structuredResponse;


        if (choise === 'NAVIGATION') {

            if (!productName || productName === "undefined") {
                return await sendTextResponse(response, genericAgent, message);
            }

            const navResult = await goToProductTool.invoke({ productName });
            const parsedResult = JSON.parse(navResult);

            if (parsedResult.action === "ERROR") {
                return await sendTextResponse(response, genericAgent, parsedResult.message);
            }

            return response.status(200).json({
                success: true,
                data: { message: parsedResult.message, redirect: parsedResult.url }
            });
        }


        let agentToInvoke;
        let contentToInvoke = message;

        if (choise === 'REVIEW') {
            agentToInvoke = reviewsAgent;
            contentToInvoke = `L'utente sta chiedendo recensioni per: "${message}". 
            Usa sempre il tool 'search_products' se il nome del prodotto non è assolutamente certo o se ci sono più prodotti simili.`;
        } else if (choise === 'RECOMMENDATION') {
            agentToInvoke = recommendationAgent;
        } else {
            agentToInvoke = genericAgent;
        }


        const finalAgentResponse = await agentToInvoke.invoke({
            messages: [new HumanMessage(contentToInvoke)]
        });

        const responseMsg = finalAgentResponse.messages.at(-1).content;


        return response.status(200).json({
            success: true,
            data: responseMsg,
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