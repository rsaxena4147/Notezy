import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () =>
      console.log("DataBase connected"));

    await mongoose.connect(`${process.env.MONGODB}/notezy`)
    
  } catch (error) {
    console.error(error.message)
  }
}
export default connectDB;
