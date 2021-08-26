const connection = require("../app/database");

class UserService {
  async create(user) {
    const { name, password } = user;
    const statement = `
    INSERT INTO users (name, password) VALUES(?,?)
    `;

    const [result] = await connection.execute(statement, [name, password]);
    // 将user存储到数据库中
    return result;
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?`;
    const [result] = await connection.execute(statement, [name]);

    return result;
  }

  async updateUserPassword(user) {
    const { name, password } = user;
    console.log(name, password);
    const statement = `UPDATE users SET password = ? WHERE name = ?`;
    const [result] = await connection.execute(statement, [password, name]);
    return result;
  }
}

module.exports = new UserService();
