const getNews = `SELECT * FROM news`;

const postNews = `INSERT INTO news (title, description, image_link ) VALUES ($1, $2, $3) RETURNING *`;

const putNews = `UPDATE news SET title = $2, description = $3, image_link = $4 WHERE id = $1 RETURNING *`;

const deleteNews = `DELETE FROM news WHERE id = $1 RETURNING *`;

export { getNews, postNews, putNews, deleteNews };
