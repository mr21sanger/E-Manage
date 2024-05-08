import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'



function EditCategory() {
  const [data, setData] = useState({
    category: "",
    description: ""
  })
  const [success, setSuccess] = useState(false)
  const { id } = useParams()
  useEffect(() => {
    axios.get("http://localhost:8000/getEditCategory/" + id)
      .then((result) => {
        console.log(result)
        if (result?.data?.status) {
          console.log(result?.data?.info)
          setData({
            ...data,
            category: result?.data?.info?.category,
            description: result?.data?.info?.description,
          })
        }
      }).catch((e) => console.log(e))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data)
    axios.put("http://localhost:8000/category/" + id, data)
      .then((result) => {
        if (result?.data?.status) {
          setData({ category: "", description: "" })
          setSuccess(true)
          setTimeout(() => {
            navigate("/dashboard/category")
          }, 2000);
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
        <div className="container h-1/2 w-1/2 bg-opacity-45 bg-white ">
          <h2 className='font-bold text-3xl'>Edit Category</h2>
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
          <div className="success-alert p-4 mb-4 text-lg text-green-700 rounded-lg bg-green-400 bg-opacity-25" role="alert">
            <span className="font-medium">Edit Category Successfully </span>
          </div>}
      </div>
    </>
  )
}

export default EditCategory
