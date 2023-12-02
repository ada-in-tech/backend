const errorHandler = (err, req, res, next) => {
    // Define a default error status code
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Set the response status code
    res.status(statusCode);

    // Send a JSON response with error information
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
};

module.exports = errorHandler;
