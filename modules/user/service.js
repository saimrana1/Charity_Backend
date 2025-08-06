const sharedability = require("../../common/sharedability");
const User = require("../../models/user.model");
module.exports = {
  getUserQuery: async (data) => {
    try {
      const queryFields = {
        firstName: (value) => new RegExp(value, "i"),
        lastName: (value) => new RegExp(value, "i"),
        email: (value) => value,
        role: (value) => value,
        isVerified: (value) => value === "true" || value === true,
      };

      const obj = await sharedability.buildObject(queryFields, data);

      return obj;
    } catch (err) {
      console.log("Error building query:", err);
      return {};
    }
  },
  getUsers: async (params, query) => {
    try {
      let users = [];
      if (params.skip && params.limit) {
        const skipPage = parseInt(params.skip);
        const limitPage = parseInt(params.limit);
        const skipDocuments = skipPage * limitPage;
        users = await User.find(query)
          .select("-password")
          .skip(skipDocuments)
          .limit(limitPage);
      } else {
        users = await User.find(query).select("-password");
      }

      return users;
    } catch (err) {
      console.log(err);
      return [];
    }
  },
};
