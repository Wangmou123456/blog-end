const Koa = require("koa");
// 解析json格式
const bodyParser = require("koa-bodyparser");
const cors = require("koa-cors");

const userRoutes = require("../router");
const { errorHandler } = require("./error-handle");
const app = new Koa();

app.use(cors());
app.use(bodyParser());
userRoutes(app);
app.on("error", errorHandler);
module.exports = app;
