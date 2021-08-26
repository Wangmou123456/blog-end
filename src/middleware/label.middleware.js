const LabelService = require("../service/label.service");
const errTypes = require("../constants/err-types");

class LabelMiddleware {
  async verifyLabel(ctx, next) {
    console.log("判断标签是否存在的middleware");

    const { title, description } = ctx.request.body;
    if (!title || !description) {
      const error = new Error(errTypes.NAME_OR_DESC_IS_REQUIRED);
      return ctx.app.emit("error", error, ctx);
    }
    const result = await LabelService.getLabelByName(title);
    console.log(result);
    if (result.length) {
      const error = new Error(errTypes.LABEL_NAME_IS_EXISTS);
      return ctx.app.emit("error", error, ctx);
    }
    await next();
  }

  async verifyLabelExists(ctx, next) {
    console.log("验证标签的middleware");
    const { labels } = ctx.request.body;

    const newLabels = [];
    for (let name of labels) {
      const [Labelresult] = await LabelService.getLabelByName(name);
      const label = { name };
      if (!Labelresult) {
        const result = await LabelService.create(name);
        label.id = result.insertId;
      } else {
        label.id = Labelresult.id;
      }
      newLabels.push(label);
    }
    ctx.labels = newLabels;
    await next();
  }
}

module.exports = new LabelMiddleware();
