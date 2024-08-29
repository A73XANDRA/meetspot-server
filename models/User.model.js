const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Name is required.'],
    },
    lastname: {
      type: String,
      required: [true, 'Lastname is required.'],
    },
    nick: {
      type: String,
      required: [true, 'Nickname is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      minlength: [8, 'The password must contain minnimun 8 characters.'],
      required: [true, 'Password is required.']
    },
    birth: {
      type: Date,
      required: [true, 'Birthday date is required.']
    },
    country: {
      type: String
    },
    phone: {
      type: String,
      minlength: [9, 'The phone must have 9 numbers'],
      trim: true
    },
    avatar: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const User = model("User", userSchema)

module.exports = User
