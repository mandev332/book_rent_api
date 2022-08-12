import { fetch } from "../utils/pg.js";
import {
  getNews,
  postNews,
  putNews,
  deleteNews,
} from "../middlewares/newsModel.js";
export default {
  GET: async function (req, res) {
    try {
      let { id } = req.params;
      let new_s = await fetch(getNews + (id ? " WHERE id = " + id : ""));
      res.json({
        status: 200,
        message: (id ? id : new_s.length) + " - news",
        data: id ? new_s[0] : new_s,
      });
    } catch (err) {
      res.json({
        status: 400,
        message: err.message,
        data: [],
      });
    }
  },
  POST: async function (req, res) {
    try {
      const { title, description, news_image } = req.body;
      if (!title || !description) {
        return res.json({
          status: 400,
          message: "You must send title and description!",
          data: [],
        });
      }
      let [new_s] = await fetch(postNews, title, description, news_image);
      res.json({
        status: 200,
        message: "Add one news!",
        data: new_s,
      });
    } catch (err) {
      res.json({
        status: 400,
        message: err.message,
        data: [],
      });
    }
  },
  PUT: async function (req, res) {
    try {
      const { id } = req.params;
      const { title, description, news_image } = req.body;
      if (!id) {
        return res.json({
          status: 402,
          message: "You must send 'id'",
          data: [],
        });
      }
      if (!title && !description && !news_image) {
        return res.json({
          status: 402,
          message: "You must send sameone data is 'title' and 'description'",
          data: [],
        });
      }
      let [news] = await fetch(getNews + " where id = " + id);
      if (!news) {
        return res.json({
          status: 400,
          message: id + " - news not found",
          data: [],
        });
      }
      let [putnews] = await fetch(
        putNews,
        id,
        title ?? news.title,
        description ?? news.description,
        news_image ?? news.news_image
      );
      res.json({
        status: 200,
        message: id + " - update news!",
        data: putnews,
      });
    } catch (err) {
      res.json({
        status: 400,
        message: err.message,
        data: [],
      });
    }
  },
  DELETE: async function (req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.json({
          status: 402,
          message: "You must send 'id'",
          data: [],
        });
      }
      let [deletenews] = await fetch(deleteNews, id);
      res.json({
        status: 200,
        message: id + " news delete!",
        data: deletenews,
      });
    } catch (err) {
      res.json({
        status: 400,
        message: err.message,
        data: [],
      });
    }
  },
};
