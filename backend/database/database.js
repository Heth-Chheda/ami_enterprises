import mongoose, { connect } from "mongoose";

export const connectionToDatabase = async () => {
  mongoose
    .connect(`${process.env.DATABASE_URL}`, {
      dbName: "ami-enterprises",
    })
    .then(() => {
      console.log("Database is connected successfully");
    })
    .catch((error) => {
      console.log(`Error while connecting to the database : ${error}`);
    });
};
