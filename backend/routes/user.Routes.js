import express from "express";
import {
  acceptFriendReq,
  getFriendsRequest,
  getMyFriends,
  getOutgoingFriendReqs,
  getRecommendedUsers,
  sendFriendRequest,
} from "../controllers/user.Controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const userRouter = express.Router();
//apply auth middleware to all routes
userRouter.use(protectRoute);

userRouter.get("/", getRecommendedUsers);
userRouter.get("/friends", getMyFriends);
userRouter.post("/friend-request/:id", sendFriendRequest);
userRouter.put("/friend-request/:id/accept", acceptFriendReq);
userRouter.get("/friend-requests", getFriendsRequest);
userRouter.get("/outgoing-friend-requests", getOutgoingFriendReqs);

export default userRouter;
