import { Router } from "express";
import newsController from "../controllers/newsController.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const Newrouter = Router();
Newrouter.get("/", newsController.GET)
  .get("/:id", newsController.GET)
  .post("/", auth.ADMIN, newsController.POST)
  .put("/:id", auth.ADMIN, newsController.PUT)
  .delete("/:id", auth.ADMIN, newsController.DELETE)
  .post("/newsimage", upload.NewsImage);
export default Newrouter;
