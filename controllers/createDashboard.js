const db = require("../db/queries");

function createDashboard(req, res) {
    res.render("dashboard", {
        title: "Dashboard",
        onDash: true,
    })
}

async function categoryGet(req, res){
    const {slug} = req.params;

    const category = await db.getCategoryBySlug(slug);

    if(category.length === 0) {
        return res.status(404).send("OOPS! Couldn't find the category!");
    }
    const items = await db.getItemsById(category[0].id);
    console.log(items)
    res.render("category", {
        title: slug,
        items: items,
        onDash: false,
    })
}

function addItemGet(req, res) {
    const {category} = req.params;
    res.render("addItem", {
        title: "Add New Item",
        category: category,
        onDash: false,
    })
}

module.exports = {
    createDashboard,
    categoryGet,
    addItemGet
}