import { tool } from "langchain";
import { z } from "zod";
import connection from "../../config/database.js";

const getReviewsTool = tool(
    async ({ productName }) => {

        const sql = `
            SELECT r.name, r.rating, r.review_content, p.name 
            FROM reviews r
            JOIN products p ON r.product_id = p.id
            WHERE p.name LIKE ?
        `;

        const [rows] = await connection.execute(sql, [`%${productName}%`]);

        if (rows.length === 0) return "Nessuna recensione trovata per questo prodotto.";

        const formatted = rows.map(row =>
            `⭐ ${row.rating}/5 - ${row.review_content}`
        ).join("\n\n");

        return `Recensioni trovate:\n\n${formatted}`;
    },
    {
        name: "get_reviews",
        description: "Recupera le recensioni dei clienti per un prodotto specifico cercandolo per nome.",
        schema: z.object({
            productName: z.string().describe("Il nome del prodotto di cui l'utente vuole le recensioni")
        }),
    }
);

export default getReviewsTool;