import express from "express";
import { addNewBasket, deleteBasketById, getAllBaskets, getBasketById, updateBasketById } from "../controllers/basket.contriller";
import { pagination } from "../middleware/pagination.js";

const basketRouter = express.Router();

basketRouter.post("/", addNewBasket);
basketRouter.get("/", pagination,getAllBaskets);
basketRouter.get("/:id", getBasketById);
basketRouter.put("/:id", updateBasketById);
basketRouter.delete("/:id", deleteBasketById);

export default basketRouter;
