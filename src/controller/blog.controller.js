const BlogService = require("../service/blog.service");

class BlogController {
  async create(ctx, next) {
    const { id: userId } = ctx.user;
    const { title, titleDesc, content } = ctx.request.body;

    const result = await BlogService.create(userId, title, titleDesc, content);

    ctx.body = result;
  }

  async list(ctx, next) {
    const { limit, offset } = ctx.request.query;
    console.log(limit, offset);
    const result = await BlogService.getBlogs(limit, offset);
    console.log(result);
    const [count] = await BlogService.getBlogsCount();

    ctx.body = {
      code: 200,
      count: count.count,
      data: result,
    };
  }

  async detail(ctx, next) {
    const { blogId } = ctx.params;
    // 2 根据id 查数据
    const result = await BlogService.getBlogById(blogId);
    ctx.body = result[0];
  }

  async update(ctx, next) {
    const { blogId } = ctx.params;
    const { title, titleDesc, content } = ctx.request.body;

    const result = await BlogService.update(title, titleDesc, content, blogId);

    ctx.body = result;
  }

  async remove(ctx, next) {
    const { blogId } = ctx.params;

    const result = await BlogService.remove(blogId);

    ctx.body = result;
  }

  async addLabels(ctx, next) {
    const { labels } = ctx;
    const { blogId } = ctx.params;
    await BlogService.deleteLabel(blogId);
    for (let label of labels) {
      await BlogService.addLabel(blogId, label.id);
    }
    ctx.body = "动态添加标签成功";
  }
}

module.exports = new BlogController();
