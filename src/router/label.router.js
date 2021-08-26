const Router = require("koa-router");

const labelRouter = new Router({ prefix: "/label" });

const { verifyAuth } = require("../middleware/auth.middleware");

const { verifyLabel } = require("../middleware/label.middleware");

const {
  create,
  list,
  detail,
  itemList,
  update,
  deleteLabel,
} = require("../controller/label.controller");

labelRouter.post("/", verifyAuth, verifyLabel, create);
labelRouter.get("/", list);
labelRouter.get("/labelId", itemList);
labelRouter.get("/:labelId/blogs", detail);
labelRouter.patch("/:labelId", verifyAuth, update);
labelRouter.delete("/:labelId", verifyAuth, deleteLabel);
module.exports = labelRouter;
