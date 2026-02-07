const {Router} = require("express");
const {createDashboard, categoryGet, addItemGet} = require("../controllers/createDashboard");

const indexRouter = Router();

indexRouter.get("/", createDashboard);
indexRouter.get("/categories/:slug", categoryGet);
indexRouter.get("/:category/new", addItemGet);
module.exports = indexRouter;