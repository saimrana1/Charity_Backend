const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");


const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "You are not authorized to access this resource",
        statusCode: 401,
      });
    }

    const protectedToken = token.replace(/^Bearer\s+/i, "");
    const decoded = jwt.verify(protectedToken, process.env.JWT_SECRET);

    req.userId = decoded.id;

    if (req.userId) {
      const user = await User.findById(req.userId).select("type name email");
      if (!user) {
        return res.status(401).json({ message: "User not found", statusCode: 401 });
      }
      req.user = user;
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Token is invalid or expired",
      statusCode: 401,
    });
  }
};

module.exports = auth;
