import jwt from "jsonwebtoken";

const sessionverifycontroller = (req, res) => {
  const token = req.cookies.token; // This should work now

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "this is a carboncredit project secret");

    // Send decoded token data in the response
    res.status(200).json({
      message: "Session verified",
      name: decoded.name,
      role: decoded.role,
      nfthash: decoded.nfthash,
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default sessionverifycontroller;
