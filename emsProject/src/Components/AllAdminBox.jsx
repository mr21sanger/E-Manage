import React from 'react'

function AllAdminBox({allAdmin,profile}) {
  return (
    <>
        <div className="bg-white bg-opacity-50 h-5/6  w-1/2 rounded-lg shadow-lg overflow-hidden">
          <h1 className='font-bold text-3xl text-black p-4 font-sans'>Your Coworker</h1>
          <div className='w-11/12 m-auto h-5/6 grid grid-cols-2 gap-2 overflow-scroll no-scrollbar '>
            {
              allAdmin && allAdmin.map((currElem) => {
                if (currElem.name == profile.name) {
                  return null
                }
                else {
                  return (
                    <>
                      <div key={currElem._id} className='w-full h-72 no-scrollbar bg-white   border-black bg-opacity-80 rounded-lg  hover:bg-opacity-90 hover:bg-blue-200 transition-all duration-300 overflow-scroll drop-shadow-2xl shadow-black  border'>
                        <div className="flex flex-col justify-center my-5 items-center">
                          <img className="w-32 h-32 rounded-full shadow-md"
                            src={currElem.image ? `${currElem.image}` : 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png'} alt="Bonnie image" />
                          <h5 className=" text-xl font-bold text-gray-900">{currElem.name}</h5>
                          <span className="text-lg text-gray-800 mb-1 ">{currElem.role}</span>
                          <div className="flex  ">
                            <a href={`mailto:${currElem.email}`} className="inline-flex items-center px-6 py-1.5 font-bold text-center text-white bg-blue-700 rounded-lg hover:bg-blue-500 text-lg focus:ring-4 focus:outline-none focus:ring-blue-300 ">Contact</a>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                }
              })}
          </div>
        </div>
    </>
  )
}

export default AllAdminBox
