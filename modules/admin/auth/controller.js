const User = require("../../../models/user.model");
const authService = require("../../../modules/auth/auth-service");

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "Email is incorrect" });
    }

    if (user.role !== "admin") {
      // 🔁 Changed from user.type
      return res.status(403).json({
        message: "Admin access required",
      });
    }

    const isPasswordValid = await authService.comparePassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect Password." });
    }

    const token = await authService.generateJwtToken(user._id);
    return res.status(200).json({
      message: "Successfully Logged In!",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // 🔁 Make sure to send role
      },
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error,
    });
  }
};
