import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import { Link, Outlet } from "react-router-dom"
import "../Components/css/style.css"
import { useAdminContext } from '../Reducer/AdminProfile'


function Dashboard() {
  const { state, fetchAdmin} = useAdminContext()
  const [profile,setProfile] = useState();

  useEffect(() => {
    const adminId = localStorage.getItem('adminId')
    if (adminId) {
      fetchAdmin(adminId)
    }
  }, [])

  useEffect(()=>(
    setProfile(state?.adminProfile)
  ),[fetchAdmin])

  return (

    <>

      <div className='w-full h-screen bg-blue-10 flex  overflow-hidden'
      style={{ backgroundImage: `url('https://imgs.search.brave.com/Sot2XEVnnvNndXOQrBTj4hLItxlEKjVl9LOtlt7CwZs/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc3F1YXJlc3Bh/Y2UtY2RuLmNvbS9j/b250ZW50L3YxLzU4/N2RmNTcwYmU2NTk0/NGViNzk5YzU1MS8x/NDg4NTM2MjMyMTU5/LUE1S1pWVjcyVksy/QTJYRzU4UDdUL3Jv/Z3VlK2VtcGxveWVl/LmpwZz9mb3JtYXQ9/MTUwMHc')` , backgroundPosition:"center", backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
        <div className='w-1/6'>
          <Sidebar />
        </div>
        <div className='w-5/6'>
          <div className='h-16 bg-blue-600 bg-opacity-7n5 w-full font-mono text-center pt-3 text-white font-extrabold   shadow-black drop-shadow-2xl text-4xl'>
            <h1>WELCOME {profile?.name}</h1>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Dashboard
