import { tool } from "langchain";
import { z } from "zod";
import connection from "../../config/database.js";

const goToProductTool = tool(
    async ({ productName }) => {

        const staticPages = {
            "menu": "/products",
            "chi siamo": "/aboutus",
            "I Top seller": "/reviews",
            "Pagina iniziale": "/",
            "homepage": "/",
            "home": "/"
        };

        const key = productName.toLowerCase().trim();

        if (staticPages[key]) {
            return JSON.stringify({
                action: "REDIRECT",
                url: staticPages[key],
                message: "Certamente, ti ci porto subito!"
            });
        }

        const [rows] = await connection.execute(
            `SELECT id FROM products WHERE LOWER(name) LIKE LOWER(?) LIMIT 1`,
            [`%${productName}%`]
        );

        if (rows.length === 0) {
            return JSON.stringify({ action: "ERROR", message: "Non ho trovato questo panino." });
        }

        const productId = rows[0].id;
        return JSON.stringify({
            action: "REDIRECT",
            url: `/products/${productId}`,
            message: `Ok, ti porto alla pagina del prodotto.`
        });
    },
    {
        name: "navigate_to_product",
        description: "Usa questo tool quando l'utente vuole navigare verso un prodotto specifico o verso pagine del sito (menu, chi siamo, recensioni).",
        schema: z.object({
            productName: z.string().describe("Il nome del panino o della sezione del sito")
        })
    }
);

export default goToProductTool;