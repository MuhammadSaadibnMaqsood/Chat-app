import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouters from './routes/auth.Routes.js';
import connectdb from './config/db.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.Routes.js';
import chatRoutes from './routes/chat.routes.js';


dotenv.config();
const app = express();
const port = process.env.PORT || 5000

app.use(cors({
    origin: 'https://chat-app-frontend-delta-five.vercel.app',
    credentials: true //accept cokie frontend
})); //enable-cross-origin
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',authRouters);
app.use('/api/user',userRouter);
app.use('/api/chat',chatRoutes);

app.use('/', (req,res)=>{
    res.send('Api is working!')
})

app.listen(port,()=>{
    console.log(`SERVER RUNNING ON PORT: ${port}`);
    //connect-db
    connectdb();
    
})