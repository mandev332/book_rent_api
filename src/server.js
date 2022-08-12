import express from "express";
import Userrouter from "../router /userRouter.js";
import Bookrouter from "../router /bookRouter.js";
import Newrouter from "../router /newRouter.js";
import AuthRouter from "../router /authRouter.js";

const app = new express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/auth", AuthRouter);
app.use("/user", Userrouter);
app.use("/new", Newrouter);
app.use("/book", Bookrouter);

app.listen(PORT, () => console.log("Server run http://localhost:" + PORT));
