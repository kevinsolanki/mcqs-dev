const {response} = require("../utils/responseService");

exports.validator = (schema) => {
    return async (req, res, next) => {
      try {
        const { error } = await schema.validate(
          { ...req.body, ...req.params, ...req.query },
          { allowUnknown: true }
        );
        if (error) return response(res, 400, error.message);
        next();
      } catch (error) {
        return response(res, 500, error.message);
      }
    };
  };