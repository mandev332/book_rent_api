const getBooks = `SELECT * FROM books`;

const postBook = `INSERT INTO books (user_id, name, author, year, janr, book_image, top, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8 ) RETURNING *`;

const putBook = `UPDATE books SET name = $2, author = $3, year = $4, janr = $5 , book_image = $6, top = $7, price = $8 WHERE id = $1 RETURNING *`;

const deleteBook = `DELETE FROM books WHERE id = $1 RETURNING *`;

export { getBooks, postBook, putBook, deleteBook };
