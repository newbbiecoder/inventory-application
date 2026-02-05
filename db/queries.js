const pool = require("./pool");

async function getCategoryBySlug(slug) {
    const {rows} = await pool.query("SELECT * FROM categories WHERE name = $1", [slug]);
    return rows;
}

async function getItemsById(id) {
    const {rows} = await pool.query("SELECT * FROM items WHERE category_id = $1", [id]);
    return rows;
}

module.exports = {
    getCategoryBySlug,
    getItemsById
}