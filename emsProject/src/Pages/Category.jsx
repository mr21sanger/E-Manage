import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import axios from 'axios'
import moment from 'moment'
import { MdDelete, MdEditSquare } from 'react-icons/md'

function Category() {

  const [catData, setCatData] = useState()

  const handleDelete = (id) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete")
      if (confirm) {
        axios.delete("http://localhost:8000/deleteCategory/" + id)
          .then((result) => console.log(result))
          .catch((e) => console.log(e))
      }
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    axios.get("http://localhost:8000/category")
      .then((result) => {
        if (result.status) {
          setCatData(result?.data)
        }
      })
      .catch((e) => console.log(e))
  }, [handleDelete])

  return (
    <>
      <div className='w-full h-full'>

        <div className='flex items-center w-4/6 justify-around gap-80'>
          <h1 className='text-4xl text-white font-bold p-4'>Categories
          </h1>
          <NavLink to={"/dashboard/categoryForm"}>
            <button className='p-3 bg-white hover:bg-gray-200 hover:ring-2 hover:ring-blue-400 rounded-xl text-blue-500 font-bold'>Add Category</button>
          </NavLink>
        </div>

        <div className="relative overflow-x-auto m-auto w-full">
          <table className="w-11/12 rounded-lg text-lg m-auto my-5 text-left rtl:text-right text-black ">
            <thead className="text-lg text-black font-bold uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sr. No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Created at
                </th>  <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>{

              catData && catData.map((currElem, idx) => {
                const createdAt = new Date(currElem?.createdAt);
                const date = createdAt.getDate();
                const month = createdAt.getMonth();
                const year = createdAt.getFullYear();
                const newDate = moment(createdAt).format('dddd, Do MMMM  YYYY')
                const formatDate = `${date} ${month}, ${year}`
                return (
                  <tr key={currElem._id} className="bg-white bg-opacity-55 border-2 border-gray-300 mb-1 ">
                    <th scope="rw" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                      {idx + 1}.
                    </th>
                    <td className="px-6 py-4">
                      {currElem.category}
                    </td>
                    <td className="px-6 py-4">
                      {currElem.description}
                    </td>
                    <td className="pl-6 py-4">
                      {newDate}
                    </td>
                    <td className="pl-3.5 py-4">
                      <NavLink to={`/dashboard/editCategory/${currElem._id}`}>
                        <button className='text-3xl mx-3'><MdEditSquare /></button></NavLink>

                      <button className='text-3xl text-red-500' onClick={() => handleDelete(currElem?._id)}><MdDelete /></button>
                    </td>
                  </tr>)
              })
            }

            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}

export default Category
