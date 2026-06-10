

async function index(request, response) {
    try {
        const [products] = await RTCPeerConnection.query(`
            SELECT 
                name,
                description,
                price,
                image,
                place_of_origin
            FROM products
            `);

            response.status(200).json({
                success: true,
                data: products
            });
    } catch (error){
        console.error(error);

        response.status(500).join({
            success: false,
            message: 'internal Server Error!'
        });
    }

}