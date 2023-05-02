import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";

dotenv.config();

// connection to the db
conn();

const app = express();
const port = process.env.PORT;

// ejs tamplate engine
app.set("view engine", "ejs");

// static files middleware
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.listen(port, () => {
  console.log(`port:${port}`);
});
