import { fetch } from "../utlls/pg.js";

const getNews = `SELECT * FROM news`;

const postNews = `INSERT INTO news (title, description, image_link ) VALUES ($1, $2,$3) RETURNING *`;

const putNews = `UPDATE news SET title = $2, description = $3, image_link = $4 WHERE id = $1 RETURNING *`;

const deleteNews = `DELETE FROM news WHERE id = $1 RETURNING *`;

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
      const { title, description, image_link } = req.body;
      if (!title || !description) {
        return res.json({
          status: 400,
          message: "You must send title and description!",
          data: [],
        });
      }
      let [new_s] = await fetch(postNews, title, description, image_link);
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
      const { title, description, image_link } = req.body;
      if (!id) {
        return res.json({
          status: 402,
          message: "You must send 'id'",
          data: [],
        });
      }
      if (!title && !description && !image_link) {
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
        image_link ?? news.image_link
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
