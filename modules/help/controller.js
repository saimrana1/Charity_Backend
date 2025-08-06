const HelpRequest = require("../../models/help.model");
exports.createHelpRequest = async (req, res) => {
  try {
    const { title, description, message } = req.body;
    const userId = req.user.id;

    if (!title || !description || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const helpRequest = await HelpRequest.create({
      userId,
      title,
      description,
      message,
      status: "pending",
    });

    return res.status(201).json({
      message: "Help request created successfully.",
      data: helpRequest,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};
