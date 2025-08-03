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

  generateJwtToken: async (userId, tokenExpiry) => {
    try {
      const jwtToken = jwt.sign({ id: userId }, config.jwt.secret, {
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
      const salt = await bcrypt.genSalt(config.bcryptSaltValue);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      return null;
    }
  },
};
