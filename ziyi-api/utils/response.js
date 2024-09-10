/**
 * 自定义 404 错误类
 */
class NotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = 'NotFoundError';
    }
  }
  

  function success(res, message, data = {}, code = 200) {
    res.status(code).json({
      status: true,
      message,
      data
    });
  }
  
  function failure(res, error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(e => e.message);
      return res.status(400).json({
        status: false,
        message: 'Query validation failed',
        errors
      });
    }
  
    if (error.name === 'NotFoundError') {
      return res.status(404).json({
        status: false,
        message: 'Article not found',
        errors: [error.message]
      });
    }
  
    res.status(500).json({
      status: false,
      message: 'Sever error',
      errors: [error.message]
    });
  }
  
  module.exports = {
    NotFoundError,
    success,
    failure
  }
  