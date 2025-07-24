import mongoose from 'mongoose';

const connectdb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGGODB_URL);
        console.log('Connected to mongo db ',conn.connection.host);
        
    } catch (error) {
       console.log('error in connecting mongo db',error);
        
    }
}
export default connectdb