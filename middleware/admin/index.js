const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");

const authAdmin = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({
        message: "You are not authorized to access this protected resource",
        statusCode: 401,
      });
    }
    const protectedToken = token.slice("Bearer ".length);
    const decoded = jwt.verify(protectedToken, process.env.JWT_SECRET);
    req.userId = decoded.id;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    if (user.role !== "admin") {
      // 🔁 Changed from user.type
      return res.status(403).json({
        message: "Admin access required",
      });
    }

    req.user = user;
    req.userType = user.role;
    req.adminName = user.firstName;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Token Is Invalid!",
      statusCode: 401,
    });
  }
};
module.exports = {
  authAdmin,
};
