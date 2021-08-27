const LabelService = require("../service/label.service");

class LabelController {
  async create(ctx, next) {
    const { title, description } = ctx.request.body;
    const result = await LabelService.create(title, description);
    console.log(result);

    ctx.body = result;
  }

  async list(ctx, next) {
    const { limit, offset } = ctx.query;
    console.log(limit, offset);
    const result = await LabelService.getLabels(limit, offset);
    console.log(result);

    ctx.body = {
      code: 200,
      message: "所有标签",
      data: result,
    };
  }

  async detail(ctx, next) {
    const { labelId } = ctx.params;
    const result = await LabelService.getLabelsByLabelId(labelId);
    ctx.body = result;
  }

  async itemList(ctx, next) {
    const { labelId } = ctx.params;
    const [result] = await LabelService.getLabelByLabelId(labelId);
    ctx.body = result;
  }

  async update(ctx, next) {
    const { labelId } = ctx.params;
    const { title, description } = ctx.request.body;
    const result = await LabelService.updateLabelByLabelId(
      labelId,
      title,
      description
    );
    ctx.body = result;
  }

  async deleteLabel(ctx, next) {
    const { labelId } = ctx.params;
    const result = await LabelService.deleteLabelByLabelId(labelId);
    console.log(result);
    ctx.body = result;
  }
}

module.exports = new LabelController();
