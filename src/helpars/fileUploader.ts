import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dsg1uwkpo",
  api_key: "926488456242347",
  api_secret: "WxQxwM2Tu7ktsSxu-A2KlWBIu4o",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (file: any) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      {
        public_id: file.originalname,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
