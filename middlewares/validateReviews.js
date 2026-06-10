function toString(value) {
    return typeof value === "string" ? value.trim() : "";
}

function toNumber(value) {
    const numberValue = Number(value);
    return Number.isNaN(numberValue) ? null : numberValue;
}

function validateReview(request, response, next) {
    const name = toString(request.body.name);
    const title = toString(request.body.title);
    const review_content = toString(request.body.review_content);
    const rating = toNumber(request.body.rating);


    if (!name) {
        response.status(400).json({
            errore: "Errore di validazione",
            messaggio: "Il nome è obbligatorio",
            campo: "name",
        })
        return;
    }

    if (name.length < 2 || name.length > 50) {
        response.status(400).json({
            errore: "Errore di validazione",
            messaggio: "Il nome deve essere tra 2 e 50 caratteri",
            campo: "name",
        })
        return;
    }

    if (!title) {
        response.status(400).json({
            errore: "Errore di validazione",
            messaggio: "Il titolo è obbligatorio",
            campo: "title",
        })
        return;
    }

    if (title.length > 100) {
        response.status(400).json({
            errore: "Errore di validazione",
            messaggio: "Il titolo non può superare 100 caratteri",
            campo: "title",
        })
        return;
    }

    if (!review_content) {
        response.status(400).json({
            errore: "Errore di validazione",
            messaggio: "Il contenuto della recensione è obbligatorio",
            campo: "review_content",
        })
        return;
    }

    if (review_content.length > 2000) {
        response.status(400).json({
            errore: "Errore di validazione",
            messaggio: "La recensione non può superare 2000 caratteri",
            campo: "review_content",
        })
        return;
    }

    if (rating === null || rating === undefined) {
        response.status(400).json({
            errore: "Errore di validazione",
            messaggio: "Il voto deve essere un numero",
            campo: "rating",
        });
        return;
    }

    if (rating < 1 || rating > 5) {
        response.status(400).json({
            errore: "Errore di validazione",
            messaggio: "Il voto deve essere compreso tra 1 e 5",
            campo: "rating",
        })
        return;
    }

    request.body = {
        name,
        title,
        review_content,
        rating,
    };

    next();
}