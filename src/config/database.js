// mongodb+srv://chandasukesh:GYD4eodeo9iXcy4X@devtindernode.hgcsu79.mongodb.net/

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://chandasukesh:GYD4eodeo9iXcy4X@devtindernode.hgcsu79.mongodb.net/DevTinder"
  );
};

module.exports = connectDB;
