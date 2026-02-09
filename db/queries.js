const pool = require("./pool");

async function getAllItems() {
    const {rows} = await pool.query("SELECT * FROM items");
    return rows;
}

async function getCategoryBySlug(slug) {
    const {rows} = await pool.query("SELECT * FROM categories WHERE name = $1", [slug]);
    return rows[0];
}

async function getItemsById(category_id) {
    const {rows} = await pool.query("SELECT * FROM items WHERE category_id = $1", [category_id]);
    return rows;
}

async function getItemById(id) {
    const {rows} = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
    return rows[0];
}

async function insertItems(itemName, quantity, unit, expiryDateValue, categoryId) {
    await pool.query(
        `
        INSERT INTO items (name, quantity, unit, expiry_date, category_id) 
        VALUES($1, $2, $3, $4, $5)
        `,
        [itemName, quantity, unit, expiryDateValue, categoryId]
    );
}

async function getTotalItems() {
    const {rows} = await pool.query("SELECT COUNT(*) FROM items");
    return rows[0].count;
}

async function deleteItemById(id) {
    await pool.query("DELETE FROM items WHERE id = $1", [id]);
}

async function updateItemById(itemName, quantity, unit, expiryDate, id) {
    await pool.query(
        `
        UPDATE items
        SET name = $1,
        quantity = $2,
        unit = $3,
        expiry_date = $4
        WHERE id = $5
        `,
        [itemName, quantity, unit, expiryDate || null, id]
    );
}

module.exports = {
    getAllItems,
    getCategoryBySlug,
    getItemsById,
    getItemById,
    insertItems,
    getTotalItems,
    deleteItemById,
    updateItemById
}