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

const categories = {
    1: "vegetables",
    2: "fruits",
    3: "dairy",
    4: "grains",
    5: "snacks",
    6: "beverages",
}

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

    if(!category) {
        return res.status(404).send(`OOPS! Couldn't find the category ${slug}!`);
    }
    const items = await db.getItemsById(category.id);

    const itemsWithExpiry = items.map(item => ({
        ...item,
        expiryStatus: checkExpiry(item.expiry_date),
        stockStatus: checkItemStock(item.quantity, item.unit),
        categoryName: category.name,
    }));

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

async function deleteItemPost(req, res) {
    const itemId = req.params.id;
    const categoryId = req.params.category_id;
    const adminPassword = req.body.adminPassword;

    if(adminPassword === process.env.ADMIN_PASS) {
        await db.deleteItemById(itemId);
        res.redirect(`/categories/${categories[categoryId]}`)
    }
    else {
        return res.send(`
            <script>
                alert("Incorrect Admin Password. Access Denied.");
                window.history.back();
            </script>
        `);
    }
    
}

async function updateItemsGet(req, res) {
    const id = req.params.id;
    const categoryId = req.params.category_id;

    const item = await db.getItemById(id);

    if(!item) {
        return res.status(404).send("Where the hell are we again??")
    }

    res.render("updateItem", {
        title: "Update Item",
        item: item,
        category: categories[categoryId],
        onDash: false,
    })
}

async function updateItemsPost(req, res) {
    const {id, category_id} = req.params;

    const {itemName, quantity, unit, expiryDate} = req.body;
    
    await db.updateItemById(itemName, quantity, unit, expiryDate, id);

    res.redirect(`/categories/${categories[category_id]}`)
}

module.exports = {
    createDashboard,
    categoryGet,
    addItemGet,
    addItemPost,
    deleteItemPost,
    updateItemsGet,
    updateItemsPost
}