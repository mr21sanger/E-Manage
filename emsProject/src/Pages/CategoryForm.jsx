import React, { useState } from 'react'
import "../Components/css/style.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CategoryForm() {
  const [data, setData] = useState({
    category: "",
    description: ""
  })
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data)
    axios.post("http://localhost:8000/category", data)
      .then((result) => {
        if (result?.data?.status) {
          setData({ category: "", description: "" })
          setSuccess(true)

          setTimeout(() => {
            navigate("/dashboard/category")
          }, 2000)
        }
      })
      .catch((e) => console.log(e))
  }


  if (success) {
    setInterval(() => {
      setSuccess(false)
    }, 5000)
  }
  return (
    <>
      <div className='w-full h-screen  flex flex-col gap-7 items-center pt-16'>
        <div className="container h-1/2 w-1/2 bg-blue-100 bg-opacity-65 ">
          <h2 className='font-bold text-3xl'>Add Category</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="category" placeholder="Category" required
              value={data.category}
              onChange={(e) => { setData({ ...data, category: e.target.value }) }} />
            <input type="text" name="description" placeholder="Description" required
              value={data.description}
              onChange={(e) => { setData({ ...data, description: e.target.value }) }} />

            <input className="font-bold text-xl" type="submit" value="Add +" />
          </form>
        </div>{success &&
          <div className="success-alert p-4 mb-4 text-lg text-green-700 rounded-lg bg-green-400 bg-opacity-85" role="alert">
            <span className="font-medium">Added Category Successfully </span>
          </div>}
      </div>
    </>
  )
}

export default CategoryForm
