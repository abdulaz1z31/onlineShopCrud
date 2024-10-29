import express from "express";
import { addNewProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/add", addNewProduct);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", updateProductById);
productRouter.delete("/:id", deleteProductById);

export default productRouter;
