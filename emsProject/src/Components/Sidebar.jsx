import React from 'react'
import { SiNginxproxymanager } from "react-icons/si";
import { NavLink } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { BiSolidLogOutCircle } from "react-icons/bi";
import { MdManageAccounts } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'




function Sidebar() {

  const navigate = useNavigate()

  const handleClick = () => {
    const confirm = window.confirm("Logout")
    if (confirm) {
      axios.get("http://localhost:8000/logout")
        .then((result) => {
          if (result?.status) {
            navigate("/")
          }
        })
        .catch((e) => console.log(e))
    } else {}

  }

  const sideOptions = [
    {
      id: 0,
      name: "Dashboard",
      to: "",
      icon: <MdDashboard />
    },
    {
      id: 1,
      name: "Manage",
      to: "/dashboard/manageEmployee",
      icon: <MdManageAccounts />

    },
    {
      id: 3,
      name: "Category",
      to: "/dashboard/category",
      icon: <BiSolidCategoryAlt />
    }, {
      id: 4,
      name: "Profile",
      to: "/dashboard/profile",
      icon: <CgProfile />

    },
    {
      id: 5,
      name: "Logout",
      to: null,
      click: handleClick,
      icon: <BiSolidLogOutCircle />

    }
  ]

  return (
    <>
      <div className='w-full h-screen bg-blue-600 bg-opacity-85 drop-shadow-2xl shadow-black'>
        <div className='h-16 w-full flex items-center justify-center bg-blue-800'>
          <NavLink to={"/dashboard"}>
            <h1 className='font-extrabold text-white font-mono text-4xl flex gap-2'><SiNginxproxymanager />E-Manage</h1>
          </NavLink>

        </div>
        <div className='w-full h-full'>
          {
            sideOptions.map((currELem) => {
              return (
                <NavLink key={currELem.id} to={currELem.to && currELem.to}>
                  <div className='flex items-center w-11/12 my-2 m-auto rounded-lg transition-all duration-150  text-center h-12 text-2xl text-white font-semibold hover:text-black hover:bg-blue-100 hover:bg-opacity-25 px-5 gap-2.5'
                    onClick={currELem.click && currELem.click}>
                    <span className='text-4xl'>{currELem.icon}</span>
                    <p className=''>{currELem.name}</p>
                  </div>
                </NavLink>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Sidebar
