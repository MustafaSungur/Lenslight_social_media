import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        console.log(err);
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
    next();
  }
};

export { authenticateToken };
