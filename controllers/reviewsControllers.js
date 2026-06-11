
import { createConnection } from 'mysql2/promise';
const connection = await createConnection({
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

//Index:
// Get/reviews restituisce tutte le recensioni con i relativi prodotti
async function indexReviews(request, response) {
    try {

        const [reviews] = await connection.query(`
            SELECT
                r.id,
                r.name,
                r.title,
                r.review_content,
                r.date,
                r.rating,
                p.id AS product_id,
                p.name AS product_name
            FROM reviews r

            JOIN products p
                ON r.product_id = p.id

            ORDER BY r.date DESC
        `);

        response.status(200).json({
            success: true,
            data: reviews
        });

    } catch (error) {
        console.error(error);

        response.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

// Get/reviews/:id restituisce le recensioni del relativo prodotto
async function IndexReviewsProduct(request, response) {
    try {

        const { id } = request.params;
        const realId = Number(id);

        if (isNaN(realId)) {
            return response.status(400).json({
                success: false,
                message: 'Invalid product id'
            });
        }

        //Verifica esistenza prodotto
        const [product] = await connection.query(
            `
            SELECT
                id,
                name
            FROM products
            WHERE id = ?
            `,
            [realId]
        );

        if (product.length === 0) {
            return response.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Recupero recensioni associate al prodotto
        const [reviews] = await connection.query(
            `
            SELECT
                id,
                name,
                title,
                review_content,
                date,
                rating
            FROM reviews
            WHERE product_id = ?
            ORDER BY date DESC
            `,
            [realId]
        );

        response.status(200).json({
            success: true,
            product: product[0],
            data: reviews
        });

    } catch (error) {

        console.error(error);

        response.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}



//Show:
async function showReview(request, response) {
    try {
        const { id } = request.params;
        const query = `SELECT * FROM reviews WHERE id=?;`

        const [results] = await connection.execute(query, [id]);
        if (results.length === 0) {
            return response
                .status(404)
                .json({ message: "Review not Found." });
        }
        return response
            .status(200)
            .json({ results });
    }
    catch (error) {
        console.error("Error requesting review:", error);
        return response
            .status(500).json({ error: "Internal Error." });
    }
}

//Create:

async function createReview(request, response) {
    try {
        const { name, title, review_content, rating, product_id } = request.body;

        const query = `
    INSERT INTO reviews (
        name,
        title,
        review_content,
        rating,
        product_id
    )
    VALUES (?, ?, ?, ?, ?)
`;

        const [result] = await connection.execute(query, [
            name,
            title,
            review_content,
            rating,
            product_id
        ]);

        return response.status(201).json({
            message: "Recensione creata con successo",
            data: {
                id: result.insertId,
                name,
                title,
                review_content,
                rating
            }
        });

    } catch (error) {
        console.error(error)
        return response.status(500).json({
            error: "Internal Error",
        });
    }
}

// Update:
async function updateReview(request, response) {
    try {
        const { id } = request.params;
        const { name, title, review_content, rating } = request.body;

        const query = `
            UPDATE reviews 
            SET name = ?, title = ?, review_content = ?, rating = ?
            WHERE id = ?;
        `;
        const [result] = await connection.execute(query, [
            name,
            title,
            review_content,
            rating,
            id
        ]);
        //notfound
        if (result.affectedRows === 0) {
            return response
                .status(404)
                .json({ message: "Review not Found." });
        }
        //ok
        return response.status(200).json({
            message: "Your review was updated!",
            id: id
        });

    } catch (error) {
        console.error("Error updating review:", error);
        return response
            .status(500).json({ error: "Internal Error." });
    }
}

//Delete:
async function deleteReview(request, response) {
    try {
        const { id } = request.params;
        const query = `DELETE FROM reviews WHERE id = ?;`;
        const [result] = await connection.execute(query, [id]);
        if (result.affectedRows === 0) {
            return response
                .status(404)
                .json({ message: "Not Found." });
        }
        return response
            .status(200)
            .json({ message: "Review deleted successfully." });

    }
    catch (error) {
        console.error("Error deleting review:", error);
        return response
            .status(500).json({ error: "Internal Error." });
    }

}

export {
    updateReview,
    showReview,
    deleteReview,
    createReview,
    indexReviews,
    IndexReviewsProduct
};

