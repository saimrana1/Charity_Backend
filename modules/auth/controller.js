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
    user = await userService.getUserData(user);
    return res.status(200).json({
      message: "Successfully Logged In!",
      data: user,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error,
    });
  }
};

exports.signupUser = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const opts = { session, new: true };
    const body = ({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      isEmailVerified,
      details,
      companyDetail,
      userId,
    } = req.body);
    body.password = await userService.hashUserPassword(password);
    let user;
    if (userId) {
      body.isEmailVerified = true;
      body.acceptInvitation = true;
      user = await User.findByIdAndUpdate(userId, body, opts);
    } else {
      const query = {
        email: email,
      };
      const findUser = await User.findOne(query);
      if (findUser) {
        return res.status(400).json({
          message: "User is already registered with this email.",
        });
      }
      if (body?.type === USER_TYPES.TALENT) {
        const profileCompletion = await userService.calculateProfileProgress(
          body
        );
        body.profileCompletion = profileCompletion;
      }
      let newUser = await User.create([body], opts);

      const sendEmail = await authService.sendAccountVerificationEmail(
        email,
        newUser[0]._id
      );

      if (!sendEmail) {
        session.abortTransaction();
        return res.status(400).json({
          message: "There is some issue in sending email.",
        });
      }
      user = newUser[0];
    }
    const token = await authService.generateJwtToken(user._id);
    if (!token) {
      session.abortTransaction();
      return res.status(400).json({
        message: "There is some issue in generating token.",
      });
    }
    await session.commitTransaction();
    user = await userService.getUserData(user);

    return res.status(201).json({
      message: "Success: Account Created! 🎉",
      data: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    session.abortTransaction();
    return res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error,
    });
  } finally {
    session.endSession();
  }
};
