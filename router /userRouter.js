import { Router } from "express";
import userController from "../controllers/userController.js";
const Userrouter = Router();
Userrouter.get("/", userController.GET)
  .get("/:id", userController.GET)
  .post("/", userController.POST)
  .put("/:id", userController.PUT)
  .delete("/:id", userController.DELETE);

export default Userrouter;
