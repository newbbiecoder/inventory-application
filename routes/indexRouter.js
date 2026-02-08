const {Router} = require("express");
const {createDashboard, categoryGet, addItemGet, addItemPost} = require("../controllers/createDashboard");

const indexRouter = Router();

indexRouter.get("/", createDashboard);
indexRouter.get("/categories/:slug", categoryGet);
indexRouter.get("/:category/new", addItemGet);
indexRouter.post("/:category/new", addItemPost);
module.exports = indexRouter;