const getBooks = `SELECT * FROM books`;

const postBook = `INSERT INTO books (user_id, name, author, year, janr, top, price) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

const putBook = `UPDATE books SET name = $2, author = $3, year = $4, janr = $5 , top = $6, price = $7 WHERE id = $1 RETURNING *`;

const deleteBook = `DELETE FROM books WHERE id = $1 RETURNING *`;

export { getBooks, postBook, putBook, deleteBook };
