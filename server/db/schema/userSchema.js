import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 30 
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    work:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required:true
    },
    cpassword:{
        type: String,
        required: true
    },
    date: {
        type: String,
        default:Date.now
    },
    messages:[
        {
            name: {
                type: String,
                required: true,
                maxlength: 30
            },
            email: {
                type: String,
                required: true
            },
            phone: {
                type: Number,
                required: true
            },
            message: {
                type: String,
                required: true
            },    
        }
    ],
    tokens: [
        {
            token :{
                type: String,
                required: true
            }
        }
    ]
});


// we are hashing the password
userSchema.pre('save', async function(next) {
    console.log("hi from inside");
    // agr koi mera password change krta hai to hi mujhe ye change krna hai 
   if(this.isModified('password')){
    this.password =  await bcrypt.hash(this.password, 12);
       this.cpassword =await bcrypt.hash(this.password, 12);
   }
   next();
});

// we are generating token
userSchema.methods.generateAuthToken = async function (){
    try{
        let token = jwt .sign ({_id: this._id} , process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (err) {
         console.log(err);
    } 
}

// store the message 
userSchema.methods.addMessage = async function (name, email, phone, message) {
    this.messages.push({ name, email, phone, message });
    await this.save();
    return this.messages;
};

const User = mongoose.model("USER", userSchema);

export default User;