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
                p.is_available,
                p.created_at,
                AVG(r.rating) AS average_rating
            FROM products p
            LEFT JOIN reviews r 
                ON p.id = r.product_id
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

        sql += ` 
            GROUP BY 
                p.id, p.name, p.description, p.price, p.image, 
                p.place_of_origin, p.is_available, p.created_at 
        `;

        if (sortBy === 'recent') {
            sql += ` ORDER BY p.created_at DESC `;
        }

        if (sortBy === 'rating') {
            sql += ` ORDER BY average_rating DESC `;
        }

        if (limit) {
            sql += ` LIMIT ? `;
            params.push(Number(limit));
        }

        const [products] = await connection.query(sql, params);

        const baseUrl = `${request.protocol}://${request.get('host')}`;

        const productsWithImages = products.map(product => {

            const imageFileName = product.image ? product.image : "placeholder.png";

            const { created_at, ...productData } = product;

            return {
                ...productData,
                price: parseFloat(product.price),
                image: `${baseUrl}/imgs/${imageFileName}`
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
        const productQuery = `
            SELECT 
                p.id,
                p.name,
                p.description,
                p.price,
                p.image,
                p.place_of_origin,
                COUNT(r.id) AS reviews_count,
                AVG(r.rating) AS average_rating
            FROM products p
            LEFT JOIN reviews r 
                ON p.id = r.product_id
            WHERE p.id = ?
            GROUP BY p.id;
        `;

        const [results] = await connection.execute(productQuery, [productId]);
        if (results.length === 0) {
            return response
                .status(404)
                .json({
                    success: false,
                    message: "Product not Found."
                });
        }

        const product = results[0];

        product.price = parseFloat(product.price);

        product.reviewsCount = Number(product.reviews_count) || 0;

        product.averageRating = product.average_rating
            ? parseFloat(parseFloat(product.average_rating).toFixed(1))
            : 0.0;

        delete product.reviews_count;
        delete product.average_rating;

        const baseUrl = `${request.protocol}://${request.get('host')}`;

        const imageFileName = product.image ? product.image : "placeholder.png";

        product.image = `${baseUrl}/imgs/${imageFileName}`;

        const reviewsQuery = `
            SELECT 
                id,
                title,
                name,
                review_content,
                rating,
                date
            FROM reviews 
            WHERE product_id = ?
            ORDER BY rating DESC
            LIMIT 4;
        `;

        const [reviews] = await connection.execute(reviewsQuery, [productId])

        product.reviews = reviews;

        return response
            .status(200)
            .json({
                success: true,
                data: product
            });

    } catch (error) {
        console.error("Error requesting product:", error);
        return response
            .status(500)
            .json({
                success: false,
                message: "Internal Error."
            });
    }
}

export { indexProduct, showProduct };