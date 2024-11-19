import jwt from "jsonwebtoken";

const sessioncontroller = (req, res) => {
  try {
    const { name, role, nfthash } = req.body;

    const token = jwt.sign(
      { name, role, nfthash },
      "this is a carboncredit project secret", // Move this to an environment variable for security
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600 * 1000,
      path: "/",
      sameSite: "Lax",
    });
    res.status(200).json({
      message: `Session created for user ${name}`,
      name: name,
      role: role,
      nfthash: nfthash,
    });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ message: "Failed to create session" });
  }
};

export default sessioncontroller;
