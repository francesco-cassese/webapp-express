function toString(value) {
    return typeof value === "string" ? value.trim() : "";
}

function toNumber(value) {
    const numberValue = Number(value);
    return Number.isNaN(numberValue) ? null : numberValue;
}

function sendValidationError(response, errors) {

    const fields = [...new Set(errors.map(error => error.field))];

    const prefix = fields.length === 1
        ? "Il seguente campo non è valido o è mancante"
        : "I seguenti campi non sono validi o sono mancanti";

    return response.status(400).json({
        error: "Errore di validazione",
        message: `${prefix}: ${fields.join(", ")}`,
        details: errors
    });
}

const cleanSearchTerm = (term) => {
    if (!term) return "";
    return term.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
};

export { toString, toNumber, sendValidationError, cleanSearchTerm }