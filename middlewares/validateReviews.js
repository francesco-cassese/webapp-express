import { toString, toNumber, sendValidationError } from "../utility/utilitydb.js";

function validateReview(request, response, next) {

    const name = toString(request.body.name).trim();
    const title = toString(request.body.title).trim();
    const review_content = toString(request.body.review_content).trim();

    const rating = toNumber(request.body.rating);
    const product_id = toNumber(request.body.product_id);

    const errors = [];

    if (!name) {
        errors.push({ field: "name", message: "Il nome è obbligatorio" });
    }

    if (name.length < 2 || name.length > 100) {
        errors.push({ field: "name", message: "Il nome deve essere tra 2 e 100 caratteri" });
    }

    if (!title) {
        errors.push({ field: "title", message: "Il titolo è obbligatorio" });
    }

    if (title.length > 100) {
        errors.push({ field: "title", message: "Il titolo non può superare 100 caratteri" });
    }

    if (!review_content) {
        errors.push({ field: "review_content", message: "Il contenuto della recensione è obbligatorio" });
    }

    if (review_content.length > 2000) {
        errors.push({ field: "review_content", message: "La recensione non può superare 2000 caratteri" });
    }

    if (isNaN(rating) || !Number.isInteger(rating)) {
        errors.push({ field: "rating", message: "Il voto deve essere un numero intero" });
    }

    if (rating < 1 || rating > 5) {
        errors.push({ field: "rating", message: "Il voto deve essere compreso tra 1 e 5" });
    }

    if (isNaN(product_id) || product_id < 1) {
        errors.push({ field: "product_id", message: "L'ID non può essere vuoto o uguale a 0" });
    }

    if (errors.length > 0) {
        return sendValidationError(response, errors);
    }

    request.body = {
        name,
        title,
        review_content,
        rating,
        product_id
    };
    next();
}

export default validateReview