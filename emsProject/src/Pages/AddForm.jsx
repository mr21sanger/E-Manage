import React, { useEffect, useState } from 'react'
import axios from 'axios'


function AddForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    department: "",
    age: "",
    phone: "",
    salary: "",
    password: "",
    confirmPassword: ""
  })

  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8000/addEmployee", data)
      .then((result) => {
        if (result?.data?.status) {
          setData({
            name: "",
            email: "",
            department: "",
            age: "",
            phone: "",
            salary: "",
            password: "",
            confirmPassword: ""
          })
          setSuccess(true)
        }
      })
      .catch((e) => console.log(e))
  }

  const [catData, setCatData] = useState()

  useEffect(() => {
    axios.get("http://localhost:8000/category")
      .then((result) => {
        if (result.status) {
          setCatData(result?.data)
        }
      })
      .catch((e) => console.log(e))
  }, [])


  if (success) {
    setInterval(() => {
      setSuccess(false)
    }, 5000)
  }
  return (
    <div className='w-full h-full py-2'>
      {success &&
        <div className="success-alert w-1/2 text-center m-auto z-0 absolute left-1/3 p-4 mb-4 text-lg text-green-700 rounded-lg bg-green-400 bg-opacity-25" role="alert">
          <span className="font-medium">Added Employee Successfully </span>
        </div>}
      <div className='container w-1/2 m-auto overflow-scroll h-5/ no-scrollbar bg-blue-100 bg-opacity-65'>
        <form onSubmit={handleSubmit}>

          <label for="name">Name</label>
          <input type="text" id="name" name="name" required placeholder="Enter name"
          value={data.name}  
          onChange={(e) => { setData({ ...data, name: e.target.value }) }} />

          <label for="department">Department</label>
          <select name="department" id="department" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500 block p-2.5'
          value={data.department}
            onChange={(e) => setData({ ...data, department: e.target.value })}>
            <option selected>Choose Department</option>

            {
              catData && catData.map((currElem) => {
                return (
                  <option value={currElem.category}>{currElem.category}</option>
                )
              })
            }
          </select>


          <label for="age">Age</label>
          <input type="number" id="age" name="age" required placeholder="Enter age"
            value={data.age}
            onChange={(e) => setData({ ...data, age: e.target.value })} />

          <label for="email">Email</label>
          <input type="email" id="email" name="email" required placeholder="Enter Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })} />

          <label for="phone">Phone Number</label>
          <input type="number" id="phone" name="phone" required placeholder="Enter phone number"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })} />

          <label for="salary">Salary</label>
          <input type="number" id="salary" name="salary" required placeholder="Enter Salary (in INR)"
            value={data.salary}
            onChange={(e) => setData({ ...data, salary: e.target.value })} />

          <label for="password">Password</label>
          <input type="password" id="password" name="password" required placeholder="Enter password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })} />

          <label for="confirm-password">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="Confirm  password"
           value={data.confirmPassword}
           onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} />


          <input type="submit" value="Add Employee"></input>
        </form>
      </div>
    </div>
  )
}

export default AddForm
