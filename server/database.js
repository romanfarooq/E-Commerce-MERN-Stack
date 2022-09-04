import mongoose from "mongoose";
const mongoUrl = process.env.MONGO_URL;

const conectToMongo = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("conected to mongo succesfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default conectToMongo;