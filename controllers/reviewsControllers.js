import { createConnection } from 'mysql2/promise';
const connection = await createConnection({
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

//Index:

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

export {
    updateReview,
    showReview
};