import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadroutecontroller = async (req, res) => {
  try {
    // Ensure that a file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload the file to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      resource_type: "raw", // Use 'raw' for non-image files like PDFs
      format: "pdf", // Specify the format as pdf
    });

    console.log(result.secure_url);
    res.json({ link: result.secure_url });
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    res
      .status(500)
      .json({ message: "Upload to Cloudinary failed", error: error.message });
  }
};

export default uploadroutecontroller;
