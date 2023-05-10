const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.register = (req, res, next) => {
  try {
    if (req.body) {
      const schema = Joi.object({
        fullName: Joi.string().required(),
        email: Joi.string().max(50).email({ minDomainSegments: 2 }).required(),
        phoneNumber: Joi.number().required(),
        password: Joi.string().required(),
        dob: Joi.date(),
      });
      let data = schema.validate(req.body);
      if (data.error) {
        return res
          .status(400)
          .json({
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
