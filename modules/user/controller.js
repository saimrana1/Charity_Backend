const User = require("../../models/user.model");
const userService=require("./service")

exports.getUsers = async (req, res) => {
  try {
    const query = await userService.getUserQuery(req.query);
    const users = await userService.getUsers(req.query, query);

    const totalDocuments = await User.countDocuments(query);

    if (!users.length) {
      return res.status(404).json({
        message: "Users data not found",
        data: users,
      });
    }

    return res.status(200).json({
      message: "Users retrieved successfully",
      data: users,
      totalUsers: totalDocuments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error,
    });
  }
};
