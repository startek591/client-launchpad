(function () {
  const mongoose = require("mongoose");

  const uri =
    process.env.MONGO_URI ||
    "mongodb+srv://startek591:Github34736@cluster0.lqomoad.mongodb.net/printshop?retryWrites=true&w=majority&appName=Cluster0";

  mongoose
    .connect(uri)
    .then(() => {
      console.log("✅ Successfully connected to MongoDB via Mongoose");
    })
    .catch((err) => {
      console.error("❌ Mongoose connection error:", err);
    });

  module.exports = mongoose;
})();
