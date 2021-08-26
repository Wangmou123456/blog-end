const service = require("../service/user.service");

class UserController {
  async create(ctx, next) {
    // 获取用户传递的参数
    const user = ctx.request.body;
    // 查询数据
    const [result] = await service.create(user);
    console.log(result);
    // 返回数据
    return result;
  }
}

module.exports = new UserController();
