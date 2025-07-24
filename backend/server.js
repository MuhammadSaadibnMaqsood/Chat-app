import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouters from './routes/auth.Routes.js';
import connectdb from './config/db.js';


dotenv.config();
const app = express();
const port = process.env.PORT || 5000

app.use(cors()); //enable-cross-origin
app.use(express.json());

app.use('/api/auth',authRouters);
app.listen(port,()=>{
    console.log(`SERVER RUNNING ON PORT: ${port}`);
    //connect-db
    connectdb();
    
})