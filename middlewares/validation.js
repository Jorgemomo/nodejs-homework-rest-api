const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};

module.exports = validation;

// const { appError } = require("../utils");

// const validation = (schema) => {
//   const func = (req, res, next) => {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       next(appError(400, error.message));
//     }
//     next();
//   };

//   return func;
// };

// module.exports = validation;
