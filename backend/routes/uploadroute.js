import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import stream from "stream"; // Import the stream module

const routerr = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dgevogpkb",
  api_key: "621374758693476",
  api_secret: "hCiHiDuACOBBd-in9FqL6RUZxA4",
});

// Use Multer with memory storage to avoid saving files to disk
const upload = multer({ storage: multer.memoryStorage() });

routerr.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Create a Cloudinary upload stream
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "Carboncredits",
        public_id: req.file.originalname.split(".").slice(0, -1).join("_"),
      },
      (error, result) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.json({ url: result.secure_url });
      }
    );

    // Convert buffer to readable stream and pipe to Cloudinary
    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);
    bufferStream.pipe(uploadStream);
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).send("Error uploading file");
  }
});

export default routerr;
