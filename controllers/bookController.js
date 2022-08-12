import { fetch } from "../utils/pg.js";
import {
  getBooks,
  putBook,
  postBook,
  deleteBook,
} from "../middlewares/bookModel.js";
export default {
  GET: async function (req, res) {
    try {
      const { id } = req.params;
      let books = await fetch(getBooks + (id ? " WHERE id = " + id : ""));
      res.json({
        status: 200,
        message: (id ? id : books.length) + " - book",
        data: id ? books[0] : books,
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
      const userId = req.userId;
      const { name, author, year, janr, book_image, top, price } = req.body;
      if (!name || !author || !year || !janr || !book_image || !top || !price) {
        return res.json({
          status: 400,
          message:
            "You must send  'name', 'author', 'year', 'janr', 'top' and 'price'!",
          data: [],
        });
      }
      let [book] = await fetch(
        postBook,
        userId,
        name,
        author,
        year,
        janr,
        book_image,
        top,
        price
      );
      res.json({
        status: 200,
        message: "Add one book!",
        data: book,
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
      const { name, author, year, janr, book_image, top, price } = req.body;
      if (!id) {
        return res.json({
          status: 402,
          message: "You must send 'id'",
          data: [],
        });
      }
      if (!name && !author && !year && !janr && !book_image && !top && !price) {
        return res.json({
          status: 402,
          message:
            "You must send sameone data is 'user_id', 'name', 'author', 'year', 'janr', 'top' or 'price'!",
          data: [],
        });
      }
      let [book] = await fetch(getBooks + " WHERE id = " + id);
      if (!book) {
        return res.json({
          status: 400,
          message: id + " - book not found",
          data: [],
        });
      }
      let [putbook] = await fetch(
        putBook,
        id,
        name ?? book.name,
        author ?? book.author,
        year ?? book.year,
        janr ?? book.janr,
        book_image ?? book.book_image,
        top ?? book.top,
        price ?? book.price
      );
      res.json({
        status: 200,
        message: id + " - update book!",
        data: putbook,
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
      let [deletebook] = await fetch(deleteBook, id);
      res.json({
        status: 200,
        message: id + " book delete!",
        data: deletebook,
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
