exports.success = (message, results=[], statusCode) => {
    return {
      message,
      error: false,
      code: statusCode,
      results,
    };
  };
  
  exports.error = (message, statusCode) => {
    return {
      message,
      code: statusCode,
      error: true,
    };
  };
  
  exports.validateRes = (errors) => {
    return {
      message: errors,
      error: true,
      code: 422,
    };
  };
  