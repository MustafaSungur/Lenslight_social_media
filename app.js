import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import pageRoute from "./routes/pageRoute.js";
import photoRoute from "./routes/photoRoute.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";

// global veriables
dotenv.config();

// connection to the db
conn();

const app = express();
const port = process.env.PORT;

// ejs tamplate engine
app.set("view engine", "ejs");

// static files middleware
app.use(express.static("public"));
// verileri json olarak gönderip alabilmek için
app.use(express.json());
// passwordu şifrelemek için
app.use(express.urlencoded({ extended: true }));
// tokenı cookilerde saklamak için
app.use(cookieParser());

// routes
app.use("/", pageRoute);
app.use("/photos", photoRoute);
app.use("/users", userRoute);

app.listen(port, () => {
  console.log(`port:${port}`);
});
