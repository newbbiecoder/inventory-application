const {Router} = require("express");
const {createDashboard, categoryGet, addItemGet, addItemPost, deleteItemGet, updateItemsGet, updateItemsPost} = require("../controllers/createDashboard");

const indexRouter = Router();

indexRouter.get("/", createDashboard);
indexRouter.get("/categories/:slug", categoryGet);
indexRouter.get("/:category/new", addItemGet);
indexRouter.post("/:category/new", addItemPost);
indexRouter.post("/:id/:category_id/delete", deleteItemGet)

indexRouter.get("/:id/:category_id/update", updateItemsGet);
indexRouter.post("/:id/:category_id/update", updateItemsPost);

module.exports = indexRouter;