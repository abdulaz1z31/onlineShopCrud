import pool from "../db.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await pool.query("SELECT * FROM products");
    res.status(200).json(products.rows);
  } catch (err) {
    next(err);
  }
};

export const addNewProduct = async (req, res, next) => {
  try {
    const { name, description, price } = req.body;

    const newProduct = await pool.query(
      "INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *",
      [name, description, price]
    );

    res.status(201).json(newProduct.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);

    if (product.rows.length === 0) {
      return res.status(404).send("Product not found");
    }

    res.status(200).json(product.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const updatedProduct = await pool.query(
      "UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *",
      [name, description, price, id]
    );

    if (updatedProduct.rows.length === 0) {
      return res.status(404).send("Product not found");
    }

    res.status(200).json(updatedProduct.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );

    if (product.rows.length === 0) {
      return res.status(404).send("Product not found");
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
};
