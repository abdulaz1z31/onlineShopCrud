import express from "express";
import { addNewBasket, deleteBasketById, getAllBaskets, getBasketById, updateBasketById } from "../controllers/basket.contriller";

const basketRouter = express.Router();

basketRouter.post("/", addNewBasket);
basketRouter.get("/", getAllBaskets);
basketRouter.get("/:id", getBasketById);
basketRouter.put("/:id", updateBasketById);
basketRouter.delete("/:id", deleteBasketById);

export default basketRouter;
