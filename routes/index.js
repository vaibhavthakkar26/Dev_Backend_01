const userController = require("../api/Controller/user.controller");
const authController = require ("../api/Controller/auth.controller");

const initialize = (app) => {
  app.use("/api/v1/user", userController);
  app.use("/api/v1/auth",authController);
};

module.exports = { initialize };