import React, { useEffect, useState } from 'react'
import { useAdminContext } from '../Reducer/AdminProfile'
import moment from 'moment'
import AllAdminBox from '../Components/AllAdminBox'
import { NavLink } from 'react-router-dom'

function Profile() {
  const { state, fetchAllAdmins } = useAdminContext()
  const profile = state?.adminProfile
  const joinedAt = new Date(profile?.joinedAt)
  const newDate = moment(joinedAt).format('dddd, Do MMMM  YYYY')
  const [allAdmin, setAllAdmin] = useState()

  useEffect(() => {
    fetchAllAdmins()
    console.log(state?.adminProfile)
  }, [])

  useEffect(() => {
    setAllAdmin(state?.allAdmin)
  }, [fetchAllAdmins])

  return (
    <>
      <div className="h-full w-full flex justify-center gap-4 mt-5">
        <div className="bg-white bg-opacity-75 h-5/6  w-1/3 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 h-2/3">
            <div className="flex items-center h-1/3">
              <img
                className="h-2/3 mx-2 rounded-full bg-cover object-cover"
                src={profile.image ? `${profile.image}` : 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png'}
                alt="Admin Profile"
              />
              <div className="ml-2">
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                <p className="text-lg text-gray-600">{profile?.role}</p>
              </div>
            </div>
            <div className="mt-1">
              <h2 className="text-black text-2xl mx-3 font-bold">More Information</h2>
              <div className="mt-1 mx-6 text-black">
                <p>Email: {profile.email}</p>
                <p>Phone: {profile.phone}</p>
                <p>Joined: {newDate}</p>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-black text-2xl mx-3 font-bold">Permissions</h2>
              <div className="mt-1 mx-6 text-black">
                <p>• Can view employee details</p>
                <p>• Can edit employee information</p>
                <p>• Can add new employees</p>
                <p>• Can delete employees</p>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className='w-full h-1/4 my-1 py-5 '>
              <NavLink to={`/dashboard/profile/${profile._id}`} className='bg-blue-500 rounded px-5 py-2 mt-5 text-white font-bold'
               >Edit Profile</NavLink>
            </div>
          </div>
        </div>

        <AllAdminBox allAdmin={allAdmin} profile={profile} />
      </div>

    </>
  )
}

export default Profile
