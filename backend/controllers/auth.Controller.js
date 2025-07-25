import { upsertStreamUser } from "../config/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// LOGIN UP

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All feilds are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or passsword" });
    }

    const isPasswordCorrect = await user.matchPassword(password);

    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid email or passsword" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.log("error in login controller " + error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
}

// SIGN UP

export async function signup(req, res) {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All feilds are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Passwod must be 6 digit long" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "email already exit try another one" });
    }

    const idx = Math.floor(Math.random() * 100) + 1;

    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = await User.create({
      fullName,
      email,
      password,
      profilePic: randomAvatar,
    });

    try {
      await upsertStreamUser({
        id: newUser._id,
        name: newUser.fullName,
        image: newUser.profilePic || "",
      });
      console.log(`Stream user Created ${newUser.fullName}`);
    } catch (error) {
      console.log("Error in creation of stream user ", error);
    }

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ success: true, newUser });
  } catch (error) {
    console.log("error in sign controller " + error);
    res.status(500).json({ message: "Internal server error " });
  }
}

// LOGOUT

export async function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logout successfully" });
}

// onboard

export async function onBoard(req, res) {
  const userId = req.user;

  try {
    const { fullName, bio, nativeLanguage, learningLanguage, location } =
      req.body;

    if (
      !fullName ||
      !bio ||
      !nativeLanguage ||
      !learningLanguage ||
      !location
    ) {
      return res.status(401).json({
        message: "All fields are required",
        missingField: [
          !learningLanguage && "learningLanguage",
          !nativeLanguage && "nativeLanguage",
          !location && "location",
          !bio && "bio",
        ].filter(Boolean),
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...req.body, isOnBoarded: true },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(401).json({ message: "User Not found" });
    }

    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || "",
      });
      console.log(`Stream user updated ${updatedUser.fullName}`);
    } catch (error) {
      console.log("Error in update in stream user ", error);
    }

    return res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.log("Error in onBoarding ", error);
    return res.status(500).json({ message: "internal server error" });
  }
}
