import express from 'express'
import { getMyFriends, getRecommendedUsers } from '../controllers/user.Controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const  userRouter = express.Router();

userRouter.use(protectRoute);

userRouter.get('/',getRecommendedUsers);
userRouter.get('/friends',getMyFriends);

export default userRouter;