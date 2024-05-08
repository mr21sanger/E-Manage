import React from 'react'

function HomeCard({ info }) {

  return (
    <>
      <div className='w-11/12 h-5/6 mx-auto bg-white rounded-xl drop-shadow-2xl border bg-opacity-85  border-gray-200'>
        <div className=' font-bold text-7xl text-center w-full pt-10 pb-5 px-20'>
          {info.logo}
        </div>
        <div className='w-full h-1/2 '>
          <p className='text-center w-11/12 font-semibold text-xl mx-auto'>{info.title}</p>
        </div>
      </div>
    </>
  )
}

export default HomeCard
