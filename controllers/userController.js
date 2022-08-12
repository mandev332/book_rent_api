import { fetch } from "../utils/pg.js";
import jwt from "jsonwebtoken";
import sha256 from "sha256";
import {
  getUser,
  postUser,
  putUser,
  deleteUser,
} from "../middlewares/userModel.js";

export default {
  GET: async function (req, res) {
    try {
      let userId = req.userId;
      let users = await fetch(getUser + " where user_id = " + userId);
      if (!users.length) {
        return res.json({
          status: 400,
          message: userId + " - user not found",
          data: [],
        });
      }
      res.json({
        status: 200,
        message: (userId ? userId : users.length) + " - user",
        data: userId ? users[0] : users,
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
      let [postuser] = await fetch(
        postUser,
        username,
        login,
        sha256(password),
        contact,
        accaunt,
        image
      );

      res.json({
        status: 200,
        message: "Add new user!",
        data: {
          token: jwt.sign(
            { userId: postuser.user_id, agent: req["headers"]["user-agent"] },
            "KEYCODE"
          ),
        },
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
      let id = req.userId;
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
      let [user] = await fetch(getUser + " where user_id = " + id);
      if (!user) {
        return res.json({
          status: 400,
          message: id + " - user not found",
          data: [],
        });
      }
      let [putuser] = await fetch(
        putUser,
        id,
        username ?? user.username,
        login ?? user.login,
        password ? sha256(password) : user.password,
        contact ?? user.contact,
        accaunt ?? user.accaunt
      );
      res.json({
        status: 200,
        message: id + " - update user!",
        data: {
          token: jwt.sign(
            { userId: putuser.id, agent: req["headers"]["user-agent"] },
            "KEYCODE"
          ),
        },
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
    let id = req.userId;
    if (!id) {
      return res.json({
        status: 402,
        message: "You must send 'user_id'",
        data: [],
      });
    }
    let [deleteuser] = await fetch(deleteUser, id);
    return res.json({
      status: 200,
      message: id + " - delete user",
      data: deleteuser,
    });
  },
};
