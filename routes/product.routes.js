import express from "express";
import { getAllProducts } from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/add");
productRouter.get("/:id");
productRouter.put("/:id");
productRouter.delete("/:id");

export default productRouter;
