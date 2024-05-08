import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'
import { FaRegUser } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { GiMoneyStack } from "react-icons/gi";
import "../Components/css/style.css"
import axios from 'axios'
import moment from 'moment';
import { MdEditSquare } from 'react-icons/md';
import { useAdminContext } from '../Reducer/AdminProfile';


function Home() {
  const [admins, setAdmins] = useState()
  const [adminCount, setAdminCount] = useState(0)
  const [employeeCount, setEmployeeCount] = useState(0)
  const [salary, setSalary] = useState(0)
    useEffect(() => {
      axios.get("http://localhost:8000/admin")
        .then((result) => {
          setAdmins(result?.data?.admin)
          setAdminCount(result?.data?.count)
        })
        .catch((e) => console.log(e))


      axios.get("http://localhost:8000/addEmployee")
        .then((result) => {
          setEmployeeCount(result?.data.length)
          const salaries = result?.data.map((currElem) => {
            return currElem.salary
          })
          const totalSalary = salaries.reduce((acc, curr) => acc + curr, 0);
          setSalary(totalSalary)
        })
        .catch((e) => console.log(e))

    }, [])

  const cards = [
    {
      id: 0,
      name: "Admin",
      Total: adminCount,
      icon: <GrUserAdmin />,
      visit: "/dashboard",

    }, {
      id: 1,
      name: "Employees",
      Total: employeeCount,
      icon: <FaRegUser />,
      visit: "/dashboard/manageEmployee"
    }, {
      id: 0,
      name: "Salary",
      Total: salary,
      icon: <GiMoneyStack />,
      visit: null
    },
  ]

  return (
    <>
      <div className='h-full overflow-scroll no-scrollbar bgPage'>
        <div className='h-1/2 flex p-8 w-full   justify-center gap-8'>

          {cards && cards.map((currElem) => {
            return (
              <Card options={currElem} />
            )
          })}
        </div>
        <div className="relative overflow-scrol mb-28 m-auto w-full h-1/2 no-scrollbar">
          <h1 className='text-5xl text-white font-extrabold px-4 py-2 w-1/4 text-center'>Admins
          </h1>
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
                  email
                </th>
                <th scope="col" className="pl-3.5 py-3">
                  Phone no.
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
              admins && admins.map((currElem, idx) => {
                const createdAt = new Date(currElem?.joinedAt);
                const newDate = moment(createdAt).format('dddd, Do MMMM  YYYY')
                return (
                  <tr key={currElem._id} className="bg-white bg-opacity-55 border-2 border-gray-300 mb-1 ">
                    <th scope="rw" className="pl-3.5 py-4 font-medium text-black whitespace-nowrap">
                      {idx + 1}.
                    </th>
                    <td className="pl-3.5 py-4 font-semibold">
                      {currElem.name}
                    </td>
                    <td className="pl-3.5 py-4">
                      {currElem.email}
                    </td>
                    <td className="pl-3.5 py-4">
                      {currElem.phone}
                    </td>

                    <td className="pl-6 py-4">
                      {newDate}
                    </td>


                    <td className="pl-3.5 py-4">
                      <a href={`mailto:${currElem.email}`}  >
                        <button className='text-lg mx-2.5 bg-blue-600 text-white font-bold p-2 rounded-xl'>Contact</button>
                      </a>

                    </td>
                  </tr>)
              })
            }

            </tbody>
          </table>
        </div >
      </div>
    </>
  )
}

export default Home
