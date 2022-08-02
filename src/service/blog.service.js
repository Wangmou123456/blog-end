const connection = require("../app/database");

class BlogService {
  async create(userId, title, titleDesc, content) {
    const statement = `
    INSERT INTO blog(title, titleDesc, content, user_id) VALUES(?,?,?,?);
    `;
    const [result] = await connection.execute(statement, [
      title,
      titleDesc,
      content,
      userId,
    ]);
    console.log(result);
    return result;
  }

  async getBlogsCount() {
    const statement = `
      SELECT COUNT(*) count FROM blog;
    `;
    const [result] = await connection.execute(statement);
    console.log(result);
    return result;
  }

  async getBlogs(limit, offset) {
    const statement = `
     SELECT 
	  b.id id,b.title title, b.titleDesc titleDesc, b.content content, b.createAt createTime, b.updateAt updateTime,
	  JSON_OBJECT('id', u.id, 'name', u.name) author,
	  (SELECT  JSON_ARRAYAGG(JSON_OBJECT('id', l.id,'name',l.name))
		 FROM label l LEFT JOIN blog_label bl ON bl.label_id = l.id WHERE bl.blog_id = b.id) labels
    FROM blog b
    LEFT JOIN users u ON b.user_id = u.id 
    LIMIT ?, ?;
    `;
    const [result] = await connection.execute(statement, [offset, limit]);
    return result;
  }

  async getBlogById(blogId) {
    console.log(blogId);
    const statement = `
    SELECT b.id id, b.title title,b.titleDesc titleDesc, b.content content, b.createAt createTime, b.updateAt updateTime,
    JSON_OBJECT('id', u.id,'name', u.name) author,
    IF(count(l.id), JSON_ARRAYAGG(JSON_OBJECT('id', l.id,'name',l.name,'desc', l.description)), NULL) labels
    FROM blog b
    LEFT JOIN users u ON b.user_id = u.id
    LEFT JOIN blog_label bl ON b.id = bl.blog_id
    LEFT JOIN label l ON bl.label_id = l.id

    WHERE b.id = ?
    GROUP BY b.id;
    `;
    const [result] = await connection.execute(statement, [blogId]);
    console.log(result);
    return result;
  }

  async update(title, titleDesc, content, blogId) {
    const statement = `	UPDATE blog SET title = ?,titleDesc = ?,content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [
      title,
      titleDesc,
      content,
      blogId,
    ]);
    return result;
  }

  async remove(blogId) {
    const statement = `
    DELETE FROM blog WHERE id = ?;
    `;

    const [result] = await connection.execute(statement, [blogId]);

    return result;
  }

  async hasLabel(blogId, labelId) {
    const statement = `
      SELECT * FROM blog_label WHERE blog_id = ? AND label_id = ?;
    `;
    const [result] = await connection.execute(statement, [blogId, labelId]);
    return result[0] ? true : false;
  }

  async addLabel(blogId, labelId) {
    const statement = `
      INSERT INTO blog_label (blog_id, label_id) VALUES (?,?);
    `;
    const [result] = await connection.execute(statement, [blogId, labelId]);

    return result;
  }

  async deleteLabel(blogId) {
    const statement = `
      DELETE FROM blog_label  WHERE  blog_id = ?;
    `;
    const [result] = await connection.execute(statement, [blogId]);

    return result;
  }
}

module.exports = new BlogService();
