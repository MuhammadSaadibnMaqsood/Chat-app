import express from 'express'
import { login,signup,logout, onBoard } from '../controllers/auth.Controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const authRouters = express.Router();

authRouters.post('/login',login);
authRouters.post('/signup',signup);
authRouters.post('/logout',logout);
authRouters.post('/onboarding',protectRoute,onBoard);
authRouters.get('/me',protectRoute,(req,res)=>{
    return res.status(200).json({success: true, user:req.user});
});


export default authRouters