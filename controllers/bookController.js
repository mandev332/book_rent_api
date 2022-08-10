import { fetch } from "../utlls/pg.js";

const getBooks = `SELECT * FROM books`;

const postBook = `INSERT INTO books (user_id, name, author, year, janr, top, price) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

const putBook = `UPDATE books SET name = $2, author = $3, year = $4, janr = $5 , top = $6, price = $7 WHERE id = $1 RETURNING *`;

const deleteBook = `DELETE FROM books WHERE id = $1 RETURNING *`;

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
      const { user_id, name, author, year, janr, top, price } = req.body;
      if (!user_id || !name || !author || !year || !janr || !top || !price) {
        return res.json({
          status: 400,
          message:
            "You must send 'user_id', 'name', 'author', 'year', 'janr', 'top' and 'price'!",
          data: [],
        });
      }
      let [book] = await fetch(
        postBook,
        user_id,
        name,
        author,
        year,
        janr,
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
      const { user_id, name, author, year, janr, top, price } = req.body;
      if (!id) {
        return res.json({
          status: 402,
          message: "You must send 'id'",
          data: [],
        });
      }
      if (!user_id && !name && !author && !year && !janr && !top && !price) {
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
