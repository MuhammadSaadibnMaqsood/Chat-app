import express from 'express'
import { login,signup,logout } from '../controllers/auth.Controller.js';

const authRouters = express.Router();

authRouters.get('/login',login);
authRouters.get('/signup',signup);
authRouters.get('/logout',logout);


export default authRouters