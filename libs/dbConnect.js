import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DataBase Connected");
  } catch (error) {
    console.log("Error connecting DB : ", error);
  }
};

export default connectMongoDB;
