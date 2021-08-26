const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/private.key")
);
const PUBLIC_KEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/public.key")
);
// 加载环境变量
dotenv.config();

module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;

module.exports.PUBLIC_KEY = PUBLIC_KEY;
module.exports.PRIVATE_KEY = PRIVATE_KEY;
