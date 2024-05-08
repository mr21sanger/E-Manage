import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAdminContext } from '../Reducer/AdminProfile'
import axios from 'axios'

function EditProfile() {
  const { id } = useParams()
  const { state, fetchAdmin } = useAdminContext();
  const [adminInfo, setAdminInfo] = useState(null)
  const [success, setSuccess] = useState(false)

  const [data, setData] = useState({
    name: "",
    email: "",
    image: "",
    phone: "",
    password: "",
  })

  const navigate = useNavigate();

  useEffect(() => {
    fetchAdmin(id)
  }, [])

  useEffect(() => {
    setAdminInfo(state?.adminProfile)
  }, [fetchAdmin])

  useEffect(() => {
    setData({
      name: adminInfo?.name,
      email: adminInfo?.email,
      phone: adminInfo?.phone,
      image: adminInfo?.image,
      password: adminInfo?.password,
    })
  }, [adminInfo])


  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      axios.put("http://localhost:8000/editAdmin/" + id, data)
        .then((result) => console.log(result))
        .catch((e) => console.log(e))
      setSuccess(true)
      setTimeout(() => {
        navigate("/dashboard/profile")
      }, 2000);
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      <div className='w-full h-full py-2'>
        {success &&
          <div className="success-alert w-1/2 text-center m-auto z-0 absolute left-1/3 p-4 mb-4 text-lg text-green-700 rounded-lg bg-green-400 bg-opacity-25" role="alert">
            <span className="font-medium">Edit Admin Successfully </span>
          </div>}
        <div className='container w-1/2 m-auto overflow-scroll h-5/ no-scrollbar bg-blue-100 bg-opacity-65'>
          <form onSubmit={handleSubmit}>

            <label for="name">Name</label>
            <input type="text" id="name" name="name" required placeholder="Enter name"
              value={data.name}
              onChange={(e) => { setData({ ...data, name: e.target.value }) }} />

            {/* <label for="age">Age</label>
          <input type="number" id="age" name="age" required placeholder="Enter age"
            value={data.age}
            onChange={(e) => setData({ ...data, age: e.target.value })} /> */}

            <label for="email">Email</label>
            <input type="email" id="email" name="email" required placeholder="Enter Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })} />

            <label for="phone">Phone Number</label>
            <input type="number" id="phone" name="phone" required placeholder="Enter phone number"
              value={data.phone}
              minLength={10}
              onChange={(e) => setData({ ...data, phone: e.target.value })} />
            <input type="submit" value="Confirm Edit"></input>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditProfile
