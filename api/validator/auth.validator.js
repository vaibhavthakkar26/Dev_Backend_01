const joi = require("joi");

exports.loginValidation = (req, res, next) => {
  try {
    if (req.body) {
      const schema = joi.object({
        email: joi.string().max(50).email({ minDomainSegments: 2 }).required(),
        password: joi.string().required(),
      });
      let data = schema.validate(req.body);
      if (data.error) {
        return res.status(400).json({
          success: false,
          message: data.error.details[0].message,
          data: {},
        });
      } else {
        next();
      }
    }
  } catch (err) {
    return res
      .status(400)
      .send({ success: false, message: "ERROR HAPPEND", data: {} });
  }
};
