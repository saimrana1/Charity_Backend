const User = require("../../models/user.model");
const authService = require("./auth-service");

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "Email is incorrect" });
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
      data: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error,
    });
  }
};

exports.signupUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, address, role } =
      req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User is already registered with this email.",
      });
    }

    const hashedPassword = await authService.hashUserPassword(password);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      address,
      role,
    });

    const token = await authService.generateJwtToken(newUser._id);
    if (!token) {
      return res.status(400).json({
        message: "There was an issue generating the token.",
      });
    }

    return res.status(201).json({
      message: "Success: Account Created! 🎉",
      data: newUser,
      token,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};
