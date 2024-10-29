import express from "express";
import { addNewUser, loginIn } from "../controllers/index.controller.js";
import {
  validationUserData,
  validationLogin,
} from "../middleware/index.middleware.js";
const userRouter = express.Router();

userRouter.post("/register", validationUserData, addNewUser);
userRouter.post("/login", validationLogin, loginIn);

export default userRouter;
