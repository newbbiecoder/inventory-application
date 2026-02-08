const db = require("../db/queries");

const LOW_STOCK_LIMITS = {
  kg: 2,
  liters: 2,
  pcs: 5,
  packs: 5,
  bags: 2,
  bottles: 6,
  cans: 6,
  bunch: 3,
  heads: 3,
  dozen: 5
};

function checkItemStock(quantity, unit) {
  const limit = LOW_STOCK_LIMITS[unit];
  if (!limit) return "In Stock";
  return quantity < limit ? "Low Stock" : "In Stock";
}

function checkExpiry(date) {
    if (!date) return "no-expiry";

    const today = new Date();
    const expiry = new Date(date);

    const diffInDays = Math.ceil(
        (expiry - today) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays < 0) return "Expired";
    if (diffInDays <= 7) return "Expiring-Soon";
}


async function createDashboard(req, res) {
    const items = await db.getAllItems();
    const totalItems = await db.getTotalItems();
    console.log(totalItems)

    const lowStockItems = items.filter(
        item => checkItemStock(item.quantity, item.unit) === "Low Stock"
    );
    
    const expiringSoonItems = items.filter(
        item => checkExpiry(item.expiry_date) === "Expiring-Soon"
    );

    res.render("dashboard", {
        title: "Dashboard",
        onDash: true,
        totalItems: totalItems,
        lowStockItems: lowStockItems,
        lowStockCount: lowStockItems.length,
        expiringSoonItems: expiringSoonItems,
        expiringSoonCount: expiringSoonItems.length
    })
}

async function categoryGet(req, res){
    const {slug} = req.params;

    const category = await db.getCategoryBySlug(slug);

    if(category.length === 0) {
        return res.status(404).send("OOPS! Couldn't find the category!");
    }
    const items = await db.getItemsById(category.id);

    const itemsWithExpiry = items.map(item => ({
        ...item,
        expiryStatus: checkExpiry(item.expiry_date),
        stockStatus: checkItemStock(item.quantity, item.unit),
        categoryName: category.name,
    }));

    console.log(itemsWithExpiry)

    res.render("category", {
        title: slug,
        items: itemsWithExpiry,
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

async function addItemPost(req, res) {
    const {itemName, quantity, unit, expiryDate} = req.body;
    const {category} = req.params;
    
    const expiryDateValue = expiryDate ? expiryDate : null;

    const getCategoryArray = await db.getCategoryBySlug(category);

    if(!category) {
        return res.status(404).send("Category not found!");
    }

    await db.insertItems(
        itemName, 
        quantity, 
        unit, 
        expiryDateValue, 
        getCategoryArray.id
    );
    res.redirect(`/categories/${category}`);
}

module.exports = {
    createDashboard,
    categoryGet,
    addItemGet,
    addItemPost
}