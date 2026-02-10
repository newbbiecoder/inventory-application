const {Client} = require("pg");
require("dotenv").config({path: 'database.env'});

const SQL = `
CREATE TABLE IF NOT EXISTS categories(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) NOT NULL
);
CREATE TABLE IF NOT EXISTS items(  
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) NOT NULL,
    quantity INTEGER NOT NULL,
    unit VARCHAR(50) NOT NULL,
    expiry_date VARCHAR(10),
    category_id INTEGER NOT NULL,
    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT
);

INSERT INTO categories (name)
VALUES
    ('Vegetables'),
    ('Fruits'),
    ('Dairy'),
    ('Grains'),
    ('Snacks'),
    ('Beverages')
ON CONFLICT DO NOTHING;
`;

const addVegetablesQuery = `
INSERT INTO items(name, quantity, unit, expiry_date, category_id)
VALUES 
    ('Tomatoes', 24, 'kg', '2026-02-10', 1),
    ('Cherry Tomatoes', 4, 'kg', '2026-02-05', 1),
    ('Spinach', 1, 'bag', '2026-02-03', 1),
    ('Romaine Lettuce', 5, 'heads', '2026-02-08', 1),
    ('Potatoes', 40, 'kg', 'No expiry', 1)
ON CONFLICT DO NOTHING;
`;

const addFruitsQuery = `
INSERT INTO items(name, quantity, unit, expiry_date, category_id)
VALUES
    ('Apples', 25, 'pcs', '2026-02-15', 2),
    ('Bananas', 18, 'pcs', '2026-02-08', 2),
    ('Oranges', 30, 'pcs', '2026-02-18', 2),
    ('Grapes', 4, 'kg', '2026-02-10', 2),
    ('Mangoes', 12, 'pcs', '2026-02-20', 2)
ON CONFLICT DO NOTHING;
`;

const addDairyQuery = `
INSERT INTO items(name, quantity, unit, expiry_date, category_id)
VALUES
    ('Milk', 20, 'liters', '2026-02-03', 3),
    ('Yogurt', 15, 'cups', '2026-02-05', 3),
    ('Butter', 6, 'packs', '2026-03-01', 3),
    ('Cheese', 8, 'blocks', '2026-02-25', 3),
    ('Cream', 5, 'cartons', 'No expiry', 3)
ON CONFLICT DO NOTHING;
`;

const addGrainsQuery = `
INSERT INTO items(name, quantity, unit, expiry_date, category_id)
VALUES
    ('Basmati Rice', 10, 'bags', '2026-12-31', 4),
    ('Wheat Flour', 15, 'kg', 'No expiry', 4),
    ('Oats', 8, 'packs', '2026-10-15', 4),
    ('Cornmeal', 6, 'kg', '2026-09-20', 4),
    ('Barley', 5, 'kg', '2026-08-30', 4)
ON CONFLICT DO NOTHING;
`;

const addSnacksQuery = `
INSERT INTO items(name, quantity, unit, expiry_date, category_id)
VALUES
    ('Potato Chips', 40, 'packets', '2026-04-10', 5),
    ('Chocolate Bars', 35, 'pcs', '2026-06-01', 5),
    ('Biscuits', 25, 'packs', '2026-05-15', 5),
    ('Popcorn', 20, 'packs', '2026-07-01', 5),
    ('Trail Mix', 10, 'packs', '2026-03-25', 5)
ON CONFLICT DO NOTHING;
`;

const addBeveragesQuery = `
INSERT INTO items(name, quantity, unit, expiry_date, category_id)
VALUES
    ('Orange Juice', 12, 'bottles', '2026-02-12', 6),
    ('Apple Juice', 10, 'bottles', '2026-02-18', 6),
    ('Soda', 30, 'cans', '2026-08-01', 6),
    ('Green Tea', 18, 'bottles', '2026-06-10', 6),
    ('Mineral Water', 50, 'bottles', '2027-01-01', 6)
ON CONFLICT DO NOTHING;
`;

async function main() {
    console.log("Seeding...");
    console.log(process.env.DATABASE_URL);
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {rejectUnauthorized: false}
    })

    await client.connect();
    await client.query(SQL);

    await client.query(addVegetablesQuery)
    await client.query(addFruitsQuery);
    await client.query(addDairyQuery);
    await client.query(addGrainsQuery);
    await client.query(addSnacksQuery);
    await client.query(addBeveragesQuery);

    await client.end();
    console.log("Done!");
}

main();