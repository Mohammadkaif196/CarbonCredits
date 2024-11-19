import express from "express";
import "dotenv/config";
import sessionroute from "./routes/sessioncreationroute.js"; // Ensure the correct filename
import sessionverifyrouter from "./routes/sessionverify.js"; // Ensure the correct filename
import cors from "cors";
import cookieParser from "cookie-parser";
import routerr from "./routes/uploadroute.js";
import axios from "axios";
import { EventEmitter } from "events";

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(routerr);

app.post("/sessioncreation", sessionroute);
app.post("/sessionverify", sessionverifyrouter);

app.post("/upload", routerr);
app.get("/", (req, res) => {
  res.json({ msg: `App is running on port ${PORT}. Thank you for visiting.` });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out successfully" });
});
app.get("/proxy/:publicId", async (req, res) => {
  const { publicId } = req.params;
  const cloudinaryUrl = `${publicId}`;

  try {
    const response = await axios.get(cloudinaryUrl, {
      responseType: "arraybuffer", // Get the response as a buffer
    });

    // Modify headers as needed
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="file.pdf"', // Change to inline
    });

    res.send(response.data); // Send the modified response
  } catch (error) {
    console.error("Error fetching from Cloudinary:", error);
    res.status(500).send("Error fetching the file");
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
