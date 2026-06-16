import { tool } from "langchain";
import { z } from "zod";
import connection from "../../config/database.js";

const searchProductsTool = tool(
    async ({ query }) => {
        const sql = `
            SELECT id, name, price
            FROM products 
            WHERE LOWER(name) LIKE LOWER(?)
            LIMIT 5
        `;

        const [rows] = await connection.execute(sql, [`%${query}%`]);

        if (rows.length === 0) {
            return "Non ho trovato prodotti simili. Prova a cercare un altro termine.";
        }

        const productList = rows
            .map(product => `- ${product.name} (${product.price}€)`)
            .join("\n");

        return `Ho trovato questi prodotti simili:\n${productList}\n\n👉 Quale intendi?`;
    },
    {
        name: "search_products",

        description: "Obbligatorio per cercare panini nel database. USALO SEMPRE PRIMA di fornire qualsiasi informazione su un prodotto, specialmente se il nome è ambiguo o generico.",
        schema: z.object({
            query: z.string().describe("Il nome o parte del nome del panino cercato")
        }),
    }
);

export default searchProductsTool;