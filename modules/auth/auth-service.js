const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  comparePassword: async (password, userPassword) => {
    try {
      const isPasswordValid = await bcrypt.compare(password, userPassword);
      return isPasswordValid;
    } catch (error) {
      return false;
    }
  },

  generateJwtToken: async (userId) => {
    try {
      const jwtSecret = process.env.JWT_SECRET;
      const jwtToken = jwt.sign({ id: userId }, jwtSecret, {
        expiresIn: "7d",
      });
      return jwtToken;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  hashUserPassword: async (password) => {
    try {
      const salt = await bcrypt.genSalt(
        parseInt(process.env.BCRYPT_SALT, 10) || 10
      );
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      return null;
    }
  },
};
