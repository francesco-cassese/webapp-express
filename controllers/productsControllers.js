import connection from "../config/database.js";

async function indexProduct(request, response) {
    try {

        const { search, available, category, limit, sortBy } = request.query;

        let sql = `
            SELECT DISTINCT
                p.id,
                p.name,
                p.description,
                p.price,
                p.image,
                p.place_of_origin,
                p.is_available
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
            sql += ` AND p.is_available = ? `;
            params.push(available === 'true');
        }

        // filtro categoria
        if (category) {
            sql += ` AND c.name = ? `;
            params.push(category);
        }

        if (sortBy === 'recent') {
            sql += ` ORDER BY p.id DESC `;
        }

        if (limit) {
            sql += ` LIMIT ? `;
            params.push(Number(limit));
        }

        console.log("SQL Query:", sql);
        console.log("Params:", params);

        const [products] = await connection.query(sql, params);

        const baseUrl = `${request.protocol}://${request.get('host')}`;

        const productsWithImages = products.map(product => {

            const imageFileName = product.image ? product.image : "placeholder.png";

            return {
                ...product,
                image: `${baseUrl}/images/${imageFileName}`
            };
        });

        response.status(200).json({
            success: true,
            data: productsWithImages
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
        const productId = request.validateId
        const query = `SELECT 
        id,
        name,
        description,
        price,
        image,
        place_of_origin 
        FROM products WHERE id=?;`

        const [results] = await connection.execute(query, [productId]);
        if (results.length === 0) {
            return response
                .status(404)
                .json({ message: "Product not Found." });
        }

        const product = results[0];

        product.price = parseFloat(product.price);

        return response
            .status(200)
            .json(product);
    }
    catch (error) {
        console.error("Error requesting product:", error);
        return response
            .status(500).json({ error: "Internal Error." });
    }
}

export { indexProduct, showProduct };