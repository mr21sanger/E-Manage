import React from 'react'
import { GrUserAdmin } from "react-icons/gr";
import { NavLink } from 'react-router-dom';

function Card({ options }) {
  const { name, icon, Total, visit } = options
  return (
    <>
   
        <NavLink to={visit && visit} className="w-1/4 max-w-sm h-full bg-white bg-opacity-75 hover:ring-1 hover:ring-blue-600 border border-gray-500 rounded-lg shadow flex justify-center items-center flex-col  gap-3">
          <div className="flex justify-center items-center flex-col px-4  h-1/2">
            <div className='m-auto bg-blue-100 shadow-lg border-2 border-black p-8 rounded-full items-center text-center flex justify-center'><span className='text-5xl '>{icon}</span></div>
          </div>
          <div className='text-center'>
            <h3 className='text-4xl font-bold'>{name}</h3>
            <p className='text-2xl font-semibold'>Total:- {Total}</p></div>
        </NavLink>
      
    </>

  )
}

export default Card
