import { tool } from "langchain";
import { z } from "zod";
import connection from "../../config/database.js";

const goToProductTool = tool(
    async ({ productName }) => {

        const input = productName.toLowerCase().trim();

        if (input.includes("menu")) {
            return JSON.stringify({ action: "REDIRECT", url: "/products", message: "Certamente, ti porto al menù!" });
        }
        if (input.includes("chi siamo") || input.includes("storia")) {
            return JSON.stringify({ action: "REDIRECT", url: "/aboutus", message: "Ti porto alla pagina Chi Siamo." });
        }
        if (input.includes("top seller") || input.includes("recensioni")) {
            return JSON.stringify({ action: "REDIRECT", url: "/reviews", message: "Ecco i nostri Top Seller!" });
        }
        if (input.includes("home") || input.includes("iniziale") || input === "home") {
            return JSON.stringify({ action: "REDIRECT", url: "/", message: "Torniamo alla home!" });
        }

        const [rows] = await connection.execute(
            `SELECT id, name FROM products WHERE LOWER(name) LIKE LOWER(?) LIMIT 1`,
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