const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const employeeSchema = new mongoose.Schema({
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
  department: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 18) {
        throw new Error("Age not valid")
      }
    }
  },
  phone: {
    type: Number,
    minlength: 10,
    required: true,
    unique: true
  },
  image: {
    type: String,
    default: null
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})


employeeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next();
})

const EmployeeModel = mongoose.model("employee", employeeSchema);

module.exports = EmployeeModel 