const jwt = require("jsonwebtoken")
const AdminModel = require("../models/model")

const auth = async (req, res,next) => {
  try {
    const token = req.cookies.token
    const verifyUser = jwt.verify(token, "jsonsecretkeyforemployeemanagementsystem")
    console.log("this is user",verifyUser)
    next()
  } catch (error) {
    res.status(404).json(error)
  }

}

module.exports = auth