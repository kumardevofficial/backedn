import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  username : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    trim: true,
    index : true
  },
  email : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    trim: true
  },
  fullname : {
    type : String,
    required : true,
    unique : true,
    trim: true
  },
  avatar : {
    type : String, // cloudinary url
    required : true
  },
  coverImage : {
    type : String // cloudinary url
  },
  watchHistory : [
    {
    type : Schema.Types.ObjectId,
    type : "video"
  }
],
password : {
  type : String,
  required : [true, 'password is required ']
},
refereshToken : {
  type : String
}
} , {timestamps : true});


// this code will help to encrypt the data
userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next() // password in string 
  this.password = bcrypt.hash(this.password, 10) // salts and rounds
  next()
})

//this code will help match the user input password the database password
userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign({
    _id: this._id,
    email: this.email,
    username : this.username,
    fullname : this.fullname
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn : process.env.ACCESS_TOKEN_EXPIRTY
  }
)
}

userSchema.methods.generateRefereshToken = function(){
  return jwt.sign({
    _id: this._id,
    email: this.email,
    username : this.username,
    fullname : this.fullname
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn : process.env.REFRESH_TOKEN_EXPIRY
  })
}

export const User  = mongoose.model("User", userSchema);