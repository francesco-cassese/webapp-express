import { createConnection } from 'mysql2/promise';

const connection = await createConnection({
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

// Get/categories restituisce tutte le categorie(in ordine alfabetico)
async function indexCategories(request, response) {
    try {

        const [categories] = await connection.query(`
            SELECT
                id,
                name,
                description
            FROM categories
            ORDER BY name ASC
            `);

        response.status(200).json({
            success: true,
            message: categories
        });
    } catch (error) {

        console.log(error);

        response.status(500).json({
            success: false,
            message: 'internal Server Error'
        });
    };
}

// Get/categories/:id/products restituisce tutti i prodotti di una categoria specifica
async function indexCategoriesProducts(request, response) {
    try {
        const { id } = request.params;
        const realId = Number(id);

        if (isNaN(realId)) {
            return response.status(400).json({
                success: false,
                message: 'Invalid category id'
            });
        }

        //Verifica esistenza categorie
        const [category] = await connection.query(`
             SELECT
                id,
                name
            FROM categories
            WHERE id = ?`,
            [realId]);

        if if (category.length === 0) {
            return response.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Recupero prodotti associati alla categoria
        const [products] = await connection.query(
            `
            SELECT
                p.id,
                p.name,
                p.description,
                p.price,
                p.image,
                p.place_of_origin,
                p.if_available
            FROM products p

            JOIN product_category pc
                ON p.id = pc.product_id

            WHERE pc.category_id = ?
            `,
            [realId]
        );

        response.status(200).json({
            success: true,
            category: category[0],
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

export {indexCategories, indexCategoriesProducts};