let getUser = `SELECT * FROM users`;

let postUser = `INSERT INTO users ( username, login, password, contact, accaunt, user_image ) values($1,$2,$3,$4,$5,$6) RETURNING *`;

let putUser = `Update users SET username = $2, login = $3, password = $4, contact= $5, accaunt = $6, user_image = $7 WHERE user_id = $1 RETURNING *`;

let deleteUser = `DELETE FROM users WHERE user_id = $1 RETURNING *`;

export { getUser, postUser, putUser, deleteUser };
