import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      succeded: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    let same = false;
    const user = await User.findOne({ userName });

    if (user) {
      same = await bcrypt.compare(password, user.password);
    } else {
      return res.status(401).json({
        succeded: false,
        error: "there is not such a user",
      });
    }

    if (same) {
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        // http isteklerinde de kullanılabilmesi için
        httpOnly: true,
        // mili saniye cinsinden tokenın geçerlilik süresi
        maxAge: 1000 * 60 * 60 * 24,
      });
      // tokenı cookie'ye kaydettikten sonra dashbord sayfasına yönlendirir
      res.redirect("/users/dashboard");
    } else {
      res.status(401).json({
        succeded: false,
        error: "Password is not matched",
      });
    }
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const getDashboardPage = (req, res) => {
  res.render("dashboard", {
    link: "dashboard",
  });
};

export { createUser, loginUser, getDashboardPage };
