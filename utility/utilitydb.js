function toString(value) {
    return typeof value === "string" ? value.trim() : "";
}

function toNumber(value) {
    const numberValue = Number(value);
    return Number.isNaN(numberValue) ? null : numberValue;
}

function sendValidationError(response, campo, messaggio) {
    return response.status(400).json({
        errore: "Errore di validazione",
        messaggio,
        campo,
    });
}

export { toString, toNumber, sendValidationError }