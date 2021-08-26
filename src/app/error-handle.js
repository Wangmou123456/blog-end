const errTypes = require("../constants/err-types");

const errorHandler = (error, ctx) => {
  let status, message;
  const errType = error.message;
  switch (errType) {
    case errTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; // Bad Request
      message = "用户名或者密码不能为空!!!";
      break;
    case errTypes.USERNAME_IS_ALREADY:
      status = 409; // conflict 冲突
      message = "用户名已经存在!!!";
      break;
    case errTypes.USERNAME_DOES_NOT_EXISTS:
      status = 400;
      message = "用户名不存在 请注册!!";
      break;
    case errTypes.PASSWORD_IS_INCURRENT:
      status = 400; // 参数错误
      message = "密码不正确, 请重新输入!!";
      break;
    case errTypes.UNAUTHORIZATION:
      status = 401; // token解析出错 无效的token
      message = "无效的token未授权!!";
      break;
    case errTypes.NAME_OR_DESC_IS_REQUIRED:
      status = 400; // Bad Request
      message = "标签名或者描述不能为空!!!";
      break;
    case errTypes.LABEL_NAME_IS_EXISTS:
      status = 409;
      message = "标签名已经存在，请重新创建";
      break;
    case errTypes.UN_BLOG_AUTHORIZATION:
      status = 409;
      message = "无权限修改博客";
      break;
    default:
      status = 404;
      message = "NOT FOUND";
  }
  ctx.body = {
    status,
    message,
  };
};

module.exports = {
  errorHandler,
};
