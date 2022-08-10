import { Router } from "express";
import bookController from "../controllers/bookController.js";
const Bookrouter = Router();
Bookrouter.get("/", bookController.GET)
  .get("/:id", bookController.GET)
  .post("/", bookController.POST)
  .put("/:id", bookController.PUT)
  .delete("/:id", bookController.DELETE);

export default Bookrouter;
