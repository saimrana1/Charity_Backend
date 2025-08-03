const Donation=require("../../models/donation.model")
exports.createDonation = async (req, res) => {
  try {
    const { amount, method, message } = req.body;
    const userId = req.user._id;

    if (!amount || !method) {
      return res
        .status(400)
        .json({ message: "Amount and method are required." });
    }

    const donation = await Donation.create({
      userId,
      amount,
      method,
      message,
      status: "pending",
    });

    return res.status(201).json({
      message: "Donation created successfully.",
      data: donation,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};
