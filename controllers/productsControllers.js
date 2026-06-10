import { createConnection } from 'mysql2/promise';
const connection = await createConnection({
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});


async function indexProduct(request, response) {
    try {

        const { search, available, category } = request.query;

        let sql = `
            SELECT DISTINCT
                p.id,
                p.name,
                p.description,
                p.price,
                p.image,
                p.place_of_origin,
                p.if_available
            FROM products p
        `;

        const params = [];

        // se serve il filtro categoria aggiungiamo le JOIN
        if (category) {
            sql += `
                JOIN product_category pc
                    ON p.id = pc.product_id
                JOIN categories c
                    ON pc.category_id = c.id
            `;
        }

        sql += ` WHERE 1 = 1 `;

        // ricerca per nome
        if (search) {
            sql += ` AND p.name LIKE ? `;
            params.push(`%${search}%`);
        }

        // filtro disponibilità
        if (available !== undefined) {
            sql += ` AND p.if_available = ? `;
            params.push(available === 'true');
        }

        // filtro categoria
        if (category) {
            sql += ` AND c.name = ? `;
            params.push(category);
        }

        const [products] = await connection.query(sql, params);

        response.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {

        console.error(error);

        response.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    };
}

//Show:
async function showProduct(request, response) {
    try {
        const { id } = request.params;
        const query = `SELECT * FROM products WHERE id=?;`

        const [results] = await connection.execute(query, [id]);
        if (results.length === 0) {
            return response
                .status(404)
                .json({ message: "Product not Found." });
        }
        return response
            .status(200)
            .json({ results });
    }
    catch (error) {
        console.error("Error requesting product:", error);
        return response
            .status(500).json({ error: "Internal Error." });
    }
}

export { indexProduct , showProduct };