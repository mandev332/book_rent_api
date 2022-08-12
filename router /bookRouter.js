import { Router } from "express";
import bookController from "../controllers/bookController.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const Bookrouter = Router();
Bookrouter.get("/", bookController.GET)
  .get("/:id", bookController.GET)
  .post("/", auth.CHECK, bookController.POST)
  .put("/:id", auth.CHECK, bookController.PUT)
  .delete("/:id", auth.CHECK, bookController.DELETE)
  .post("/bookimage", upload.BookImage);

export default Bookrouter;
