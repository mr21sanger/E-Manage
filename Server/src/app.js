const express = require("express");
const app = express();
const cors = require("cors")
const AdminModel = require("./models/model")
const EmployeeModel = require("./models/employeeModel")
const CategoryModel = require("./models/category")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser")
require("./db/connection")
const port = process.env.PORT || 8000

app.use(express.json())
app.use(cookie());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

app.post("/admin", async (req, res) => {
  try {
    const admin = new AdminModel(req.body)
    const info = await admin.save()
    res.status(201).send(info)
  } catch (error) {

  }

})

app.get("/admin", async (req, res) => {
  try {
    const admin = await AdminModel.find()
    const count = admin.length

    return res.status(200).send({ status: true, admin, count })
  } catch (error) {
    return res.status(404).send({ status: false, error })
  }

})

app.get("/adminProfile/:id", async (req, res) => {
  try {
    const _id = req.params.id

    const adminProfile = await AdminModel.findById(_id)
    return res.status(200).send({ status: true, adminProfile })
  } catch (error) {
    res.status(404).json({ status: false, error })
  }
})


app.put("/editAdmin/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id)
    const updates = req.body;
    const updatedProfile = await AdminModel.findByIdAndUpdate(_id, updates, { new: true })
    await updatedProfile.save();
    return res.status(200).json({status:true})
  } catch (error) {
    console.log(error)
    return res.status(404).json({ status: false, error })
  }
})

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const adminInfo = await AdminModel.findOne({ email })
  if (adminInfo) {
    const adminPass = await bcrypt.compare(password, adminInfo.password)
    if (adminPass) {
      const token = jwt.sign({ role: "admin", email: email }, "jsonsecretkeyforemployeemanagementsystem", {
        expiresIn: "1d"
      })
      res.cookie("token", token)
      return res.json({ loginStatus: true, adminInfo })
    } else {
      return res.json({ loginStatus: false, Error: "Invalid Email or Password" })
    }
  } else {
    return res.json({ loginStatus: false, Error: "Invalid Email or Password" })
  }
})


app.post("/addEmployee", async (req, res) => {
  try {
    const password = req.body.password;
    const cPass = req.body.confirmPassword;
    if (password === cPass) {
      const employee = await EmployeeModel({
        name: req.body.name,
        department: req.body.department,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
        salary: req.body.salary,
        password: password
      })
      const data = await employee.save()
      res.json({ status: true })
    } else {
      res.status(404).json({ status: false, error: "Password did not match" })
    }
  } catch (error) {
    console.log("this is error", error)
  }

})


// CATEGORY
app.post("/category", async (req, res) => {
  try {
    const categoryData = await CategoryModel({
      category: req.body.category,
      description: req.body.description
    })
    const data = await categoryData.save()
    res.status(201).json({ status: true })
  } catch (error) {
    res.status(404).json({ status: false, error: error })
  }
})


// GET CATEGORY
app.get("/category", async (req, res) => {
  try {
    const data = await CategoryModel.find();
    return res.status(201).json(data)
  } catch (error) {
    return res.status(404).json(err)
  }
})


// GET EMPLOYEE
app.get("/addEmployee", async (req, res) => {
  try {
    const data = await EmployeeModel.find();
    return res.status(201).json(data)
  } catch (error) {
    return res.status(404).json(err)
  }
})


//GET EMPLOYEE FOR EDIT 
app.get("/getEditEmployee/:id", async (req, res) => {
  try {
    const _id = req.params.id
    const info = await EmployeeModel.find({ _id })
    return res.status(200).json({ status: true, info })
  }
  catch (err) {
    res.status(404).json(err)
  }
})

app.put("/editEmployee/:id", async (req, res) => {
  try {
    const _id = req.params.id
    const updates = req.body
    const update = await EmployeeModel.findByIdAndUpdate({ _id },
      updates,
      { new: true })
    await update.save()
    return res.status(200).json({ status: true })
  } catch (error) {
    console.log(error)
  }
})

//DELETE EMPLOYEE
app.delete("/deleteEmployee/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    await EmployeeModel.findByIdAndDelete({ _id }, {
      new: true
    })
    return res.status(200).json({ status: true })
  } catch (error) {
    return res.status(404).json({ status: false, error: Error })
  }
})

//DELETE Category
app.delete("/deleteCategory/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    await CategoryModel.findByIdAndDelete({ _id }, {
      new: true
    })
    return res.status(200).json({ status: true })
  } catch (error) {
    return res.status(404).json({ status: false, error: Error })
  }
})

//GET CATEGORY FOR EDIT 
// GET CATEGORY FOR EDIT 
app.get("/getEditCategory/:id", async (req, res) => {
  try {
    const _id = req.params.id; // Use req.params.id to get the ID from the URL parameter
    const info = await CategoryModel.findById(_id); // Use findById to find the category by ID
    return res.status(200).json({ status: true, info });
  } catch (err) {
    console.error(err);
    return res.status(404).json(err);
  }
});

//EDIT CATEGORY
app.put("/category/:id", async (req, res) => {
  try {
    const _id = req.params.id
    const updates = req.body
    const update = await CategoryModel.findByIdAndUpdate({ _id },
      updates,
      { new: true })
    await update.save()
    return res.status(200).json({ status: true })
  } catch (error) {
    console.log(error)
  }
})


// LOGOUT
app.get("/logout", async (req, res) => {
  try {
    res.clearCookie('token')
    return res.status(200).json({ status: true })

  } catch (error) {
    return res.status(404).json(error)
  }
})

app.listen(port, () => {
  console.log("Server is running")
})