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
    expiry_date DATE,
    category_id INTEGER NOT NULL,
    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT
);
`

async function main() {
    console.log("Seeding...");
    console.log(process.env.DATABASE_URL);
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {rejectUnauthorized: false}
    })

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("Done!");
}

main();