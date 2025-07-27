import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { getStreamToken } from '../controllers/chat.Controller.js';

const chatRoutes = express.Router()

chatRoutes.get('/token',protectRoute,getStreamToken)

export default chatRoutes