import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    fullName:{typeof: String,required:true},
    email:{typeof: String,required:true,unique: true},
    password: {typeof:String,required:true,minLength: 6},
    bio:{typeof: String,default:''},
    profilePic:{typeof: String,default:''},
    nativeLanguage: {typeof:String,default:''},
    learningLanguage: {typeof:String,default:''},
    location: {typeof:String,default:''},
    isOnBoarded: {typeof:Boolean,default:false},
    friends:[{
        typeof:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},{timeStamps: true});


const User = mongoose.model('User',userSchema);

export default User