const express = require('express');

const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    
    const errorObj = {
        status: 500,
        message: 'Something broke!',
        err: err.message  // Include the specific error message
    };

    res.status(500).send(errorObj); // Send the error object as a response
};

module.exports = errorHandlerMiddleware; // Export the middleware function
