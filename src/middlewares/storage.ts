import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "-" + uuidv4() + path.extname(file.originalname)
      );
    },
  }),
});

export const uploadSingleFile = () => upload.single("image")
