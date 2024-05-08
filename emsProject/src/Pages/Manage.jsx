import React, { useEffect, useState } from 'react'
import "../Components/css/style.css"
import axios from "axios"
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import { MdEditSquare, MdDelete } from "react-icons/md";


function Manage() {
  const [emData, setEmData] = useState()


  const handleDelete = (id) => {
    axios.delete("http://localhost:8000/deleteEmployee/" + id)
      .then((result) => console.log(result))
      .catch((e) => console.log(e))
  }

  useEffect(() => {
    axios.get("http://localhost:8000/addEmployee")
      .then((result) => {
        if (result.status) {
          setEmData(result?.data)
        }
      })
      .catch((e) => console.log(e))
  }, [handleDelete])



  return (
    <>
      <div className='w-full h-full bgPage'>
        <div className='flex items-center w-4/6 justify-around gap-80'>
          <h1 className='text-4xl text-white font-bold p-4'>Employee
          </h1>
          <NavLink to={"/dashboard/manageEmployee/add"}>
            <button className='p-3 bg-white hover:bg-gray-200 hover:ring-2 hover:ring-blue-300 rounded-xl text-blue-600 font-bold'>Add Employee</button>
          </NavLink>
        </div>

        <div className="relative overflow-x-auto m-auto w-full">
          <table className="w-11/12 rounded-lg text-lg m-auto my-5 text-left rtl:text-right text-black ">
            <thead className="text-lg text-black font-bold uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="pl-3.5 py-3">
                  Sr. No.
                </th>
                <th scope="col" className="pl-3.5 py-3">
                  Name
                </th>
                <th scope="col" className="pl-3.5 py-3">
                  Department
                </th>
                <th scope="col" className="pl-3.5 py-3">
                  Phone no.
                </th>
                <th scope="col" className="pl-3.5 py-3">
                  Salary
                </th>
                <th scope="col" className="pl-3.5 py-3">
                  Joined at
                </th>
                <th scope="col" className="pl-3.5 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>{

              emData && emData.map((currElem, idx) => {
                const createdAt = new Date(currElem?.date);
                const newDate = moment(createdAt).format('dddd, Do MMMM  YYYY')
                return (
                  <tr key={currElem._id} className="bg-white bg-opacity-55 border-2 border-gray-300 mb-1 ">
                    <th scope="rw" className="pl-3.5 py-4 font-medium text-black whitespace-nowrap">
                      {idx + 1}.
                    </th>
                    <td className="pl-3.5 py-4">
                      {currElem.name}
                    </td>
                    <td className="pl-3.5 py-4">
                      {currElem.department}
                    </td>
                    <td className="pl-3.5 py-4">
                      {currElem.phone}
                    </td>
                    <td className="pl-3.5 py-4">
                      ₹{currElem.salary}
                    </td>
                    <td className="pl-6 py-4">
                      {newDate}
                    </td>


                    <td className="pl-3.5 py-4">
                      <NavLink to={`/dashboard/editEmployee/${currElem._id}`}>
                        <button className='text-2xl mx-2.5'><MdEditSquare /></button></NavLink>
                      <button className='text-2xl text-red-500' onClick={() => handleDelete(currElem?._id)}><MdDelete /></button>
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

export default Manage
