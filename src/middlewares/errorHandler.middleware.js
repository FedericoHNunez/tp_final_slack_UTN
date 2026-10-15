function errorHandler(error, req, res, next) {
    //error controlado
    if (error.status) {
        return res.status(error.status).json({
            ok: false,
            status: error.status,
            message: error.message,
        });
    }
    // Error de ID inválido en Mongoose (CastError)
    if (error.name === "CastError") {
        return res.status(400).json({
            ok: false,
            status: 400,
            message: `Identificador inválido: '${error.value}' para el campo '${error.path}'`,
        });
    }

    // Error de validación de esquemas en Mongoose (ValidationError)
    if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({
            ok: false,
            status: 400,
            message: "Error de validación",
            errors: messages,
        });
    }

    // Error no controlado
    console.error("Error no controlado:", error);
    return res.status(500).json({
        ok: false,
        status: 500,
        message: "internal server error",
    });
};

export default errorHandler;
