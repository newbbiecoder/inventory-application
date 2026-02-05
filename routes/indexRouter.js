const {Router} = require("express");
const {createDashboard, categoryGet} = require("../controllers/createDashboard");

const indexRouter = Router();

indexRouter.get("/", createDashboard);
indexRouter.get("/categories/:slug", categoryGet);
module.exports = indexRouter;