import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protectRoute(req, res, next) {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token found" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token " });
    }

    const user = await User.findById(decode.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - No user found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in middle ware ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
