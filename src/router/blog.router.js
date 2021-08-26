const Router = require("koa-router");

const blogRouter = new Router({ prefix: "/blog" });

const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");

const { verifyLabelExists } = require("../middleware/label.middleware");

const {
  create,
  list,
  detail,
  update,
  remove,
  addLabels,
} = require("../controller/blog.controller");

blogRouter.post("/", verifyAuth, create);

blogRouter.get("/", list);
blogRouter.get("/:blogId", detail);

blogRouter.patch("/:blogId", verifyAuth, verifyPermission, update);
blogRouter.delete("/:blogId", verifyAuth, verifyPermission, remove);

// 添加标签
blogRouter.post(
  "/:blogId/labels",
  verifyAuth,
  verifyPermission,
  verifyLabelExists,
  addLabels
);

module.exports = blogRouter;
