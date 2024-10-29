import pool from "../db.js";

export const addNewBasket = async (req, res, next) => {
  try {
    const { product_id, quantity } = req.body;

    const productaPrice = await pool.query(
      "SELECT price FROM products WHERE id = $1",
      [product_id]
    );

    if (productaPrice.rows.length === 0) {
      return res.status(404).send("Product not found");
    }

    const productPrice = productaPrice.rows[0].price;
    const totalPrice = productPrice * quantity;

    const newBasket = await pool.query(
      "INSERT INTO basket (product_id, quantity, price) VALUES ($1, $2, $3) RETURNING *",
      [product_id, quantity, totalPrice]
    );

    res.status(201).json(newBasket.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const getAllBaskets = async (req, res, next) => {
  try {
    const baskets = await pool.query("SELECT * FROM basket");
    res.status(200).json(baskets.rows);
  } catch (err) {
    next(err);
  }
};

export const getBasketById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const basket = await pool.query("SELECT * FROM basket WHERE id = $1", [id]);

    if (basket.rows.length === 0) {
      return res.status(404).send("Basket not found");
    }

    res.status(200).json(basket.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const updateBasketById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const productID = await pool.query(
      "SELECT product_id FROM basket WHERE id = $1",
      [id]
    );
    if (productID.rows.length === 0) {
      return res.status(404).send("Basket not found");
    }

    const productId = productID.rows[0].product_id;
    const productaPrice = await pool.query(
      "SELECT price FROM products WHERE id = $1",
      [productId]
    );
    const productPrice = productaPrice.rows[0].price;
    const totalPrice = productPrice * quantity;

    const updatedBasket = await pool.query(
      "UPDATE basket SET quantity = $1, price = $2 WHERE id = $3 RETURNING *",
      [quantity, totalPrice, id]
    );

    res.status(200).json(updatedBasket.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const deleteBasketById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const basket = await pool.query(
      "DELETE FROM basket WHERE id = $1 RETURNING *",
      [id]
    );

    if (basket.rows.length === 0) {
      return res.status(404).send("Basket not found");
    }

    res.status(200).json({ message: "Basket deleted successfully" });
  } catch (err) {
    next(err);
  }
};
