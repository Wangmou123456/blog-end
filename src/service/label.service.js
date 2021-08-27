const connection = require("../app/database");

class LabelService {
  async create(name, description = "") {
    console.log(name, description);
    const statement = `
    INSERT INTO label (name,description) VALUES(?,?);
    `;
    const [result] = await connection.execute(statement, [name, description]);
    console.log("1");
    return result;
  }

  async getLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }

  async getLabelsByLabelId(labelId) {
    const statement = `
    SELECT l.id id,l.name title, l.description description,l.createAt createTime, l.updateAt updateTime,
    IF(count(b.id),JSON_ARRAYAGG(JSON_OBJECT('id', b.id,'title',b.title,'titleDesc', b.titleDesc, 'createTime', b.createAt,'author',JSON_OBJECT('id', u.id, 'name', u.name))),null) blogs 
    FROM label l
    LEFT JOIN blog_label bl ON bl.label_id = l.id
    LEFT JOIN blog b ON bl.blog_id = b.id
    LEFT JOIN users u ON b.user_id = u.id
    WHERE l.id = ?;
    `;
    const [result] = await connection.execute(statement, [labelId]);
    return result;
  }

  async getLabels(limit, offset) {
    const statement = `
    SELECT 
	  l.id id,l.name title, l.description description, l.createAt createTime, l.updateAt updateTime,
	  (SELECT COUNT(*) FROM label) count
    FROM label l
    LIMIT ?, ?;
    `;
    const [result] = await connection.execute(statement, [offset, limit]);
    console.log(result);
    return result;
  }

  async getLabelByLabelId(labelId) {
    const statement = `
      SELECT * FROM label WHERE id = ?;
    `;
    const [result] = await connection.execute(statement, [labelId]);

    return result;
  }

  async updateLabelByLabelId(labelId, title, description) {
    const statement = `
      UPDATE label SET name = ?,description = ? WHERE id = ?;
    `;
    const [result] = await connection.execute(statement, [
      title,
      description,
      labelId,
    ]);
    console.log(result);
    return result;
  }

  async deleteLabelByLabelId(labelId) {
    const statement = `
    DELETE FROM label WHERE id = ?;
    `;
    const [result] = await connection.execute(statement, [labelId]);
    return result;
  }
}

module.exports = new LabelService();
