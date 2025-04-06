const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500; // Default to 500 if no status is set
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        message
       
    });
};

module.exports = errorHandler;
