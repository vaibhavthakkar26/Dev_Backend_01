const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
      userImg: {
        type: String,
        required: true,
        trim: true,
      },
      userId:{
        type: String,
        required: true,
        unique: true,
      },
      fullName: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      phoneNumber: {
        type: Number,
        required: true,
        trim: true,
      },
      password:{
        type:String,
        required: true,
        trim:true
      },
      dob:{
        type:Date,
        required: true,
        trim:true
      },
      token:{
        type:String,
        required:false,
        trim : true
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );
  const User = mongoose.model("user", UserSchema);
  module.exports = User;