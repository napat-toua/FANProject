module.exports = (err, req, res, nest) => {   

    const statusCode = err.statusCode || 500

    res.status(statusCode).json({ 
        status_code: statusCode,
        message: err.message,
        validation: err.validation,
    })
}