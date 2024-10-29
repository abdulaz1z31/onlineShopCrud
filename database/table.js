import pool from "./database.js";

export const createTables = async () => {
  try {
    const tables = [
        `CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            price NUMERIC(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS basket (
            id SERIAL PRIMARY KEY,
            product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
            quantity INTEGER NOT NULL,
            price NUMERIC(10, 2) NOT NULL 
        )`,
    ];

    for (let table of tables) {
      await pool.query(table);
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
