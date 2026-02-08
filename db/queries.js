const pool = require("./pool");

async function getCategoryBySlug(slug) {
    const {rows} = await pool.query("SELECT * FROM categories WHERE name = $1", [slug]);
    return rows[0];
}

async function getItemsById(id) {
    const {rows} = await pool.query("SELECT * FROM items WHERE category_id = $1", [id]);
    return rows;
}

async function insertItems(itemName, quantity, unit, expiryDate, categoryId) {
    await pool.query(
        `
        INSERT INTO items (name, quantity, unit, expiry_date, category_id) 
        VALUES($1, $2, $3, $4, $5)
        `,
        [itemName, quantity, unit, expiryDate, categoryId]
    );
}

module.exports = {
    getCategoryBySlug,
    getItemsById,
    insertItems
}