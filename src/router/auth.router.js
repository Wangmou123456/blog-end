const Router = require("koa-router");

const authRouter = new Router({ prefix: "/login" });

const { login } = require("../controller/auth.controller");

const { verifyLogin } = require("../middleware/auth.middleware");

authRouter.post("/", verifyLogin, login);

module.exports = authRouter;
