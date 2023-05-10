const { createToken } = require("../../helper/gaurd");
const User = require("../Modal/user.modal");
const bcrypt = require("bcryptjs");

exports.login = async (body) => {
  try {
    const userData = await User.findOne({ email: body.email });
    console.log("userData",userData);
    if (userData) {
      const validated = await bcrypt.compare(body.password, userData.password);
      console.log("validate",validated);
      if (validated) {
        const token = createToken(userData.userId);
        return {
          success: true,
          message: "user registered",
          data: { ...JSON.parse(JSON.stringify(userData)), token },
        };
      } else {
        return { success: false, message: "INVALID_USER", data: {} };
      }
    } else {
      return { success: false, message: "NOT_FOUND", data: {} };
    }
  } catch (err) {
    return {
        success: false,
        message: "ERROR_USER_",
        data: err.message + "rrrrrrr",
      };
  }
};
