import path from "path";

export default {
  UserImage: async function (req, res, next) {
    try {
      if (req.method == "PUT" && !req.files) return next();
      console.log(req.files);
      const { image } = req.files;
      const fileName = image.name.replace(/\s/g, "");
      if (
        !["jpg", "jpeg", "png"].includes(image.mimetype.split("/")[1]) ||
        image.size / 1024 / 1024 > 10
      ) {
        throw new Error(
          "can only jpg (limit 10 mb) and limit of title 20 letters"
        );
      }
      const filePath = path.join(
        process.cwd(),
        "files",
        "userImages",
        fileName
      );
      await image.mv(filePath);
      return res.json({
        status: 200,
        message: "user's image uploaded",
        data: "/files/userImages/" + fileName,
      });
    } catch (err) {
      res.json({
        status: 400,
        message: err.message,
        data: [],
      });
    }
  },
  BookImage: async function (req, res, next) {
    try {
      if (req.method == "PUT" && !req.files) return next();
      const { image } = req.files;

      const fileName = image.name.replace(/\s/g, "");
      if (
        !["jpg", "jpeg", "png"].includes(image.mimetype.split("/")[1]) ||
        image.size / 1024 / 1024 > 10
      ) {
        throw new Error(
          "can only jpg (limit 10 mb) and limit of title 20 letters"
        );
      }

      const filePath = path.join(
        process.cwd(),
        "files",
        "bookImages",
        fileName
      );
      await image.mv(filePath);
      return res.json({
        status: 200,
        message: "book's image uploaded",
        data: "/files/bookImages/" + fileName,
      });
    } catch (err) {
      res.json({
        status: 400,
        message: err.message,
        data: [],
      });
    }
  },
  NewsImage: async function (req, res, next) {
    try {
      if (req.method == "PUT" && !req.files) return next();

      const { image } = req.files;

      const fileName = image.name.replace(/\s/g, "");
      if (
        !["jpg", "jpeg", "png"].includes(image.mimetype.split("/")[1]) ||
        image.size / 1024 / 1024 > 10
      ) {
        throw new Error(
          "can only jpg (limit 10 mb) and limit of title 20 letters"
        );
      }

      const filePath = path.join(
        process.cwd(),
        "files",
        "newsImages",
        fileName
      );
      await image.mv(filePath);
      return res.json({
        status: 200,
        message: "news's image uploaded",
        data: "/files/newsImages/" + fileName,
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
