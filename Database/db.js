const mongoose = require("mongoose");
const db =
  "mongodb+srv://sham123:sham123@devconnector.uljv9.mongodb.net/DevConnector?retryWrites=true&w=majority";

const connectToDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connected online to mongoDB");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectToDb;
