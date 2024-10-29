import express from "express";

const basketRouter = express.Router();

basketRouter.post("/");
basketRouter.get("/");
basketRouter.get("/:id");
basketRouter.put("/:id");
basketRouter.delete("/:id");

export default basketRouter;
