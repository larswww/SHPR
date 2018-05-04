"use strict";

/**
 * Please put any unhandled Errors in here and assign them a statusCode
 * Optional change the message of the error.
 * @param err
 */
function validateError(err) {
  if (err.message) console.error('validateError', err.message)
  if (err.stack) console.error(err.stack)
  if (err.error && err.error.message ) {
    console.error('validateError, handled:', err.error.message)
    return
  } //already handled in the controller
  if (err.name === "CastError") {
    err.statusCode = 400;
    err.message = "The given input was not valid.";
  }

  if (err.name === "ValidationError") {
    err.statusCode = 402;
  }

  if (err.name === "JsonWebTokenError"){
    err.statusCode = 401;
  }

  if (err.name === "TypeError") {
    err.statusCode = 500;
  }


}

module.exports = validateError;