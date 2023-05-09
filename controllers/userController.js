import User from "../models/userModel.js";
import bcrypt from "bcrypt";

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
      res.status(200).send("you are logged in");
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

export { createUser, loginUser };
