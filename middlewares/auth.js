import jwt from "jsonwebtoken";
import sha256 from "sha256";
import { fetch } from "../utils/pg.js";
import { getUser } from "./userModel.js";

export default {
  ADMIN: async function (req, res, next) {
    try {
      const { userId, agent } = jwt.verify(
        req.headers.token,
        process.env.KEYCODE
      );
      if (req["headers"]["user-agent"] != agent)
        throw new Error("You use Fake Token! ");
      req.userId = userId;
      let [user] = await fetch(getUser + ` where user_id = $1`, userId);
      if (user.role != "admin") throw new Error("Only admin can do this!");
      return next();
    } catch (err) {
      res.json({
        status: 401,
        message: err.message,
        data: [],
      });
    }
  },
  CHECK: async function (req, res, next) {
    try {
      const { userId, agent } = jwt.verify(
        req.headers.token,
        process.env.KEYCODE
      );
      if (req["headers"]["user-agent"] != agent)
        throw new Error("You use Fake Token! ");
      req.userId = userId;
      return next();
    } catch (err) {
      res.json({
        status: 401,
        message: err.message,
        data: [],
      });
    }
  },
  LOGIN: async function (req, res) {
    try {
      let { login, password } = req.body;
      if (!login) throw new Error("login is required!");
      if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password))
        throw new Error(
          "Invalid password! You must input in letter and number!"
        );
      let [user] = await fetch(
        getUser + ` where login = $1 and password = $2`,
        login,
        sha256(password)
      );
      if (!user) throw new Error("Unauthorized user!");
      res.json({
        status: 200,
        message: "Succesffuly",
        data: {
          token: jwt.sign(
            { userId: user.user_id, agent: req["headers"]["user-agent"] },
            process.env.KEYCODE
          ),
        },
      });
    } catch (err) {
      res.json({
        status: 401,
        message: err.message,
        data: [],
      });
    }
  },
  REGISTER: async function (req, res, next) {
    try {
      console.log(req.files);
      checkData(req.body);
      return next();
    } catch (err) {
      res.json({
        status: 404,
        message: err.message,
        data: [],
      });
    }
  },
};

function checkData(obj) {
  let { username, login, password, contact } = obj;
  if (!username || !login || !password || !contact)
    throw new Error(
      "You must send 'username', 'login', 'password' and 'contact'!"
    );
  if (username.length > 30 || username.length < 3)
    throw new Error("Invalid 'username'. You send length > 3 and < 30!");
  if (password.length < 4 || password.length > 10)
    throw new Error("Invalid password! You must input in length > 4 and < 10!");
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password))
    throw new Error("Invalid password! You must input in letter and number!");
  if (!/^[39][0-9]{8}$/.test(contact))
    throw new Error("Invalid contact! You can use Uzb mobile number!");
}
