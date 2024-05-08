const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const admin = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    minlength: 2,
    maxlength: 30
  },
  email: {
    type: String,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not Valid")
      }
    },
    required: true,
    unique: true
  },
  phone: {
    type: Number,
    minlength: 10,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  joinedAt: {
    type: Date,
    default: Date.now()
  },
  image: {
    type: String,
    default: null
  },
  role: {
    type: String
  }
})


admin.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next();
})

const AdminModel = mongoose.model("Admin", admin);

module.exports = AdminModel 