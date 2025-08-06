module.exports = {
  buildObject: async (fields, source) => {
    const obj = {};

    // Handle standard fields transformation
    for (const [field, transform] of Object.entries(fields)) {
      if (source[field] !== undefined) {
        obj[field] = transform(source[field]);
      }
    }
    return obj;
  },
};
