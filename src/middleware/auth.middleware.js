const jwt = require("jsonwebtoken");

const errTypes = require("../constants/err-types");
const userService = require("../service/user.service");
const authService = require("../service/auth.service");
const md5Password = require("../utils/password-handle");

const { PUBLIC_KEY } = require("../app/config");

class AuthMiddleware {
  async verifyLogin(ctx, next) {
    console.log("验证登录的middlleware");
    const { name, password } = ctx.request.body;

    // 2 判断用户名或者密码是否为空
    if (!name || !password) {
      const error = new Error(errTypes.NAME_OR_PASSWORD_IS_REQUIRED);
      return ctx.app.emit("error", error, ctx);
    }

    // 3 判断用户是否存在
    const [result] = await userService.getUserByName(name);
    const user = result;
    if (!result) {
      const error = new Error(errTypes.USERNAME_DOES_NOT_EXISTS);
      return ctx.app.emit("error", error, ctx);
    }

    const { password: newPassword } = result;
    if (md5Password(password) !== newPassword) {
      const error = new Error(errTypes.PASSWORD_IS_INCURRENT);
      return ctx.app.emit("error", error, ctx);
    }

    if (password === newPassword) {
      await userService.updateUserPassword({
        name,
        password: md5Password(password),
      });
    }

    ctx.user = user;

    await next();
  }

  async verifyAuth(ctx, next) {
    console.log("验证授权的middlleware");

    const authorization = ctx.headers.authorization;

    if (!authorization) {
      console.log(!authorization);
      const error = new Error(errTypes.UNAUTHORIZATION);
      return ctx.app.emit("error", error, ctx);
    }
    const token = authorization.replace("Bearer ", "");
    try {
      const result = jwt.verify(token, PUBLIC_KEY, {
        algorithms: "RS256",
      });
      ctx.user = result;
    } catch (err) {
      const error = new Error(errTypes.UNAUTHORIZATION);
      ctx.app.emit("error", error, ctx);
      return;
    }

    await next();
  }

  async verifyPermission(ctx, next) {
    console.log("验证权限的middleware~~");

    const [resourceKey] = Object.keys(ctx.params);
    const tableName = resourceKey.replace("Id", "");
    const resourceId = ctx.params[resourceKey];

    const { id: userId } = ctx.user;
    // 查询数据库是否具备权限
    const isPermission = await authService.checkResource(
      tableName,
      resourceId,
      userId
    );
    console.log();
    if (!isPermission) {
      const error = new Error(errTypes.UN_BLOG_AUTHORIZATION);
      return ctx.app.emit("error", error, ctx);
    }

    await next();
  }
}

module.exports = new AuthMiddleware();
