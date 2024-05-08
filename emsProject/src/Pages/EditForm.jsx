import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'


function EditForm() {
  const { id } = useParams();
  const [success, setSuccess] = useState();
  const [data, setData] = useState({
    name: "",
    email: "",
    department: "",
    age: "",
    phone: "",
    salary: "",
  })

  const navigate = useNavigate()

  const [catData, setCatData] = useState()

  useEffect(() => {
    axios.get("http://localhost:8000/category")
      .then((result) => {
        if (result.status) {
          setCatData(result?.data)
        }
      })
      .catch((e) => console.log(e))

    axios.get("http://localhost:8000/getEditEmployee/" + id)
      .then((result) => {
        console.log(result)
        if (result?.data?.status) {
          console.log(result?.data?.info)
          setData({
            ...data,
            name: result?.data?.info?.[0]?.name,
            age: result?.data?.info?.[0]?.age,
            salary: result?.data?.info?.[0]?.salary,
            phone: result?.data?.info?.[0]?.phone,
            email: result?.data?.info?.[0]?.email,
            department: result?.data?.info?.[0]?.department,
          })
        }
      }).catch((e) => console.log(e))

  }, [])

  const handleSubmit = () => {
    axios.put("http://localhost:8000/editEmployee/" + id, data)
      .then((result) => {
        console.log("hii")
        console.log(result)
      })
      .catch((e) => console.log(e))
  }

  const handleDiscard = () => {
    navigate("/dashboard/manageEmployee")
  }
  return (
    <>
      <div className='w-full h-full py-2'>

        {success &&
          <div className="success-alert w-1/2 text-center m-auto z-0 absolute left-1/3 p-4 mb-4 text-lg text-green-700 rounded-lg bg-green-400 bg-opacity-25" role="alert">
            <span className="font-medium">Edit Successfully</span>
          </div>}
        <div className='container w-2/3 m-auto overflow-scroll h-5/6 pb-5 bg-white bg-opacity-40  no-scrollbar'>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required placeholder="Enter name"
              value={data?.name}
              onChange={(e) => setData({ ...data, name: e.target.value })} />

            <label htmlFor="department">Department</label>
            <select name="department" id="department" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500 block p-2.5'
              value={data?.department}
              onChange={(e) => setData({ ...data, department: e.target.value })}
            >
              <option value={"Choose Department"} selected>Choose Department</option>

              {
                catData && catData.map((currElem, idx) => {
                  return (
                    <option key={idx} value={currElem.category}>{currElem.category}</option>
                  )
                })
              }
            </select>


            <label htmlFor="age">Age</label>
            <input type="number" id="age" name="age" required placeholder="Enter age"
              value={data?.age}
              onChange={(e) => setData({ ...data, age: e.target.value })} />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required placeholder="Enter Email"
              value={data?.email}
              onChange={(e) => setData({ ...data, email: e.target.value })} />

            <label htmlFor="phone">Phone Number</label>
            <input type="number" id="phone" name="phone" required placeholder="Enter phone number"
              value={data?.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })} />

            <label htmlFor="salary">Salary</label>
            <input type="number" id="salary" name="salary" required placeholder="Enter Salary (in INR)"
              value={data?.salary}
              onChange={(e) => setData({ ...data, salary: e.target.value })} />
            <div className='flex'>
              <button type="submit" value="Save Changes" className='p-3 text-xl m-2 w-1/2 font-bold text-white rounded-xl drop-shadow-xl shadow-black bg-green-500'>Save Changes</button>
              <button className='p-3 text-xl font-bold text-white w-1/2 m-2 rounded-xl drop-shadow-xl shadow-black bg-red-500 '
                onClick={handleDiscard}>Discard</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditForm
