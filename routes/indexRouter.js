const {Router} = require("express");
const {createDashboard} = require("../controllers/createDashboard");

const indexRouter = Router();

indexRouter.get("/", createDashboard);

module.exports = indexRouter;