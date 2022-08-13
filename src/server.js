import fileUpload from "express-fileupload";
import express from "express";
import path from "path";
import Userrouter from "../router /userRouter.js";
import Bookrouter from "../router /bookRouter.js";
import Newsrouter from "../router /newRouter.js";
import AuthRouter from "../router /authRouter.js";
const app = new express();
const PORT = process.env.PORT || 5000;

app.use(fileUpload());
app.use(express.json());
app.use("/files", express.static(path.join(process.cwd(), "files")));
app.use("/auth", AuthRouter);
app.use("/user", Userrouter);
app.use("/news", Newsrouter);
app.use("/book", Bookrouter);

app.listen(PORT, () => console.log("Server run http://localhost:" + PORT));
