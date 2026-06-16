import { tool } from "langchain";
import { z } from "zod";
import connection from "../../config/database.js";

const recommendationTool = tool(
    async ({ subject }) => {

        try {

            const query = `
            SELECT p.name, p.price 
            FROM products p
            INNER JOIN product_category pc ON pc.product_id = p.id
            INNER JOIN categories c ON c.id = pc.category_id
            WHERE LOWER(TRIM(c.name)) = LOWER(TRIM(?))
`;

            const [rows] = await connection.execute(query, [subject]);

            if (rows.length === 0) {
                return `Non ho trovato materie corrispondenti a '${subject}'.`;
            }

            const menu = rows
                .map(product => `- ${product.name} (${product.price}€)`)
                .join("\n");

            return `Per ${subject}, ti consiglio questi panini:\n${menu}`;

        } catch (error) {
            console.error("ERRORE NEL TOOL RECOMMENDATION:", error);
            return "Mi dispiace, al momento ho problemi a consultare il menu. Riprova tra poco!";
        }
    },
    {
        name: "get_exam_recommendation",
        description: "Obbligatorio per consigliare panini in base alla materia di studio citata dall'utente.",
        schema: z.object({
            subject: z.string()
        })
    }
);

export default recommendationTool;