const errType = require("../constants/err-types");
const userService = require("../service/user.service");
const md5Password = require("../utils/password-handle");

class UserMiddleware {
  async verifyUser(ctx, next) {
    // 1 获取用户名密码
    const { name, password } = ctx.request.body;

    // 2 判断用户名或者密码不能为空
    if (!name || !password) {
      const error = new Error(errType.NAME_OR_PASSWORD_IS_REQUIRED);
      return ctx.app.emit("error", error, ctx);
    }

    // 3 判断这次注册的用户名是没有注册过的
    const result = await userService.getUserByName(name);
    if (result) {
      const error = new Error(errType.USERNAME_IS_ALREADY);
      return ctx.app.emit("error", error, ctx);
    }
    await next();
  }

  async handlePassword(ctx, next) {
    let { password } = ctx.request.body;
    ctx.request.body.password = md5password(password);

    await next();
  }
}

module.exports = new UserMiddleware();
