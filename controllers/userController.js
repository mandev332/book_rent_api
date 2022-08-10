import { fetch } from "../utlls/pg.js";

let SelectUser = `SELECT * from users`;

let PostUser = `INSERT INTO users ( username, login, password, contact, accaunt, image ) values($1,$2,$3,$4,$5,$6) RETURNING *`;

let PutUser = `Update users SET username = $2, login = $3, password = $4, contact= $5, accaunt = $6 WHERE user_id = $1 RETURNING *`;

let DeleteUser = `DELETE from users WHERE user_id = $1 RETURNING *`;

export default {
  GET: async function (req, res) {
    try {
      let { id } = req.params;
      let users = await fetch(
        SelectUser + (id ? " where user_id = " + id : "")
      );
      if (!users.length) {
        return res.json({
          status: 400,
          message: id + " - user not found",
          data: [],
        });
      }
      res.json({
        status: 200,
        message: (id ? id : users.length) + " - user",
        data: id ? users[0] : users,
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
      let { username, login, password, contact, accaunt, image } = req.body;
      if (!username || !login || !password || !contact) {
        return res.json({
          status: 402,
          message:
            "You must send 'username', 'login', 'password' and 'contact'",
          data: [],
        });
      }
      let [postuser] = await fetch(
        PostUser,
        username,
        login,
        password,
        contact,
        accaunt,
        image
      );
      res.json({
        status: 200,
        message: "Add new user!",
        data: postuser,
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
      let { username, login, password, contact, accaunt, image } = req.body;
      let { id } = req.params;
      if (!id) {
        return res.json({
          status: 402,
          message: "You must send 'user_id'",
          data: [],
        });
      }
      if (!username && !login && !password && !contact) {
        return res.json({
          status: 402,
          message:
            "You must send sameone data is 'username', 'login', 'password' or 'contact'",
          data: [],
        });
      }
      let [user] = await fetch(SelectUser + " where user_id = " + id);
      if (!user) {
        return res.json({
          status: 400,
          message: id + " - user not found",
          data: [],
        });
      }
      let [putuser] = await fetch(
        PutUser,
        id,
        username ?? user.username,
        login ?? user.login,
        password ?? user.password,
        contact ?? user.contact,
        accaunt ?? user.accaunt
      );
      res.json({
        status: 200,
        message: id + " - update user!",
        data: putuser,
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
    let { id } = req.params;
    if (!id) {
      return res.json({
        status: 402,
        message: "You must send 'user_id'",
        data: [],
      });
    }
    let [deleteuser] = await fetch(DeleteUser, id);
    return res.json({
      status: 200,
      message: id + " - delete user",
      data: deleteuser,
    });
  },
};
