import { HumanMessage } from "langchain";
import routerAgent from "../ai/agents/routingAgent.js";
import genericAgent from "../ai/agents/genericAgent.js";
import reviewsAgent from "../ai/agents/reviewsAgent.js";
import connection from "../config/database.js";
import { cleanSearchTerm } from "../utility/utilitydb.js";

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

        if (choise === 'REVIEW') {

            const searchParam = cleanSearchTerm(productName || message);

            const [rows] = await connection.execute(
                `SELECT name 
                FROM products 
                WHERE name LIKE ?`,
                [`%${searchParam}%`]
            );

            if (rows.length > 1) {
                const name = rows.map(product => product.name).join(", ");
                return response.status(200).json({
                    success: true,
                    data: `Ho trovato diversi panini che corrispondono alla tua richiesta: ${name}. Quale ti interessa?`
                });
            }

            if (rows.length === 0) {
                return response.status(200).json({
                    success: true,
                    data: "Non ho trovato prodotti che corrispondono alla tua ricerca. Sei sicuro del nome?"
                });
            }

        }

        const agentToInvoke = choise === 'REVIEW' ? reviewsAgent : genericAgent;

        const finalAgentResponse = await agentToInvoke.invoke({
            messages: [new HumanMessage(message)]
        });

        const responseMsg = finalAgentResponse.messages.at(-1).content;

        response.status(200).json({
            success: true,
            data: responseMsg
        });

    } catch (error) {
        console.error("Error in chat controller:", error);
        response.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export default handleChat;