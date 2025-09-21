import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouters from "./routes/auth.Routes.js";
import connectdb from "./config/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.Routes.js";
import chatRoutes from "./routes/chat.routes.js";
import path from "path";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, //accept frontend send cookie
  })
);
//enable-cross-origin
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouters);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.use("/", (req, res) => {
  res.send("Api is working!");
});

app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT: ${port}`);
  //connect-db
  connectdb();
});
