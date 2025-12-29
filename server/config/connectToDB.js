const mongoose = require("mongoose");

const connectToDB = () =>
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MONGO ATLAS !!");
    })
    .catch((err) => {
      console.log("Connection to MONGO ATLAS Failed , error : ", err.message);
    });

module.exports = connectToDB;
