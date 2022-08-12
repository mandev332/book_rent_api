import { Router } from "express";
import auth from "../middlewares/auth.js";
import userController from "../controllers/userController.js";

const router = Router();

router
  .post("/login", auth.LOGIN)
  .post("/register", auth.REGISTER, userController.POST);

export default router;
