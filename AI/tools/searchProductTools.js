import { tool } from "langchain";
import z from "zod";

const searchProductsTool = tool(
    async ({ query }) => {
        const sql = `SELECT name, price FROM products WHERE name LIKE ?`;
        const [rows] = await connection.execute(sql, [`%${query}%`]);

        if (rows.length === 0) {
            return "Non ho trovato prodotti simili. Prova a cercare un altro termine.";
        }

        const listaProdotti = rows.map(p => `- ${p.name} (${p.price}€)`).join("\n");

        return `Ho trovato questi prodotti simili:\n${listaProdotti}\n\nPer favore, dimmi quale di questi preferisci per continuare.`;
    },
    {
        name: "search_products",
        description: "Usa questo tool per cercare prodotti nel catalogo. Se trovi più di un prodotto, elenca i nomi e chiedi all'utente di sceglierne uno.",
        schema: z.object({
            query: z.string().describe("Il termine di ricerca (es. 'porchetta' o 'nucleare')")
        }),
    }
);

export default searchProductsTool;