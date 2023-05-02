import mongoose from "mongoose";

const conn = () => {
  mongoose
    .connect(process.env.DB_URL, {
      dbName: "leslight_tr",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the DB saccessfully");
    })
    .catch((err) => console.log(`DB coonection err: ${err}`));
};

export default conn;
