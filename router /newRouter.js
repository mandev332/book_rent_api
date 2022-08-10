import { Router } from "express";
import newController from "../controllers/newsController.js";
const Newrouter = Router();
Newrouter.get("/", newController.GET)
  .get("/:id", newController.GET)
  .post("/", newController.POST)
  .put("/:id", newController.PUT)
  .delete("/:id", newController.DELETE);

export default Newrouter;
