import { toString, toNumber, sendValidationError } from "../utility/utilitydb.js";

function validateReview(request, response, next) {
    const name = toString(request.body.name);
    const title = toString(request.body.title);
    const review_content = toString(request.body.review_content);
    const rating = toNumber(request.body.rating);
    const product_id = toNumber(request.body.product_id);

    if (!name) {
        return sendValidationError(response, "name", "Il nome è obbligatorio");
    }

    if (name.length < 2 || name.length > 100) {
        return sendValidationError(response, "name", "Il nome deve essere tra 2 e 100 caratteri");
    }

    if (!title) {
        return sendValidationError(response, "title", "Il titolo è obbligatorio");
    }

    if (title.length > 100) {
        return sendValidationError(response, "title", "Il titolo non può superare 100 caratteri");
    }

    if (!review_content) {
        return sendValidationError(response, "review_content", "Il contenuto della recensione è obbligatorio");
    }

    if (review_content.length > 2000) {
        return sendValidationError(response, "review_content", "La recensione non può superare 2000 caratteri");
    }

    if (rating == null) {
        return sendValidationError(response, "rating", "Il voto deve essere un numero");
    }

    if (rating < 1 || rating > 5) {
        return sendValidationError(response, "rating", "Il voto deve essere compreso tra 1 e 5");
    }

    if (product_id == null || product_id < 1) {
        return sendValidationError(response, "product_id", "Il prodotto non è valido");
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