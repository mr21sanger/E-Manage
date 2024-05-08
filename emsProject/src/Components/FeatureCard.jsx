import React from 'react'

function FeatureCard({info}) {
  return (
    <>
      <div className='h-full w-1/3  py-5'>
        <div className='w-5/6 rounded  h-1/3 px-5 pt-8 bg-black bg-opacity-15 mx-auto mb-10 '>
          <img src={`${info.imgSrc}`} alt="img"
            className='w-full m-auto rounded-2xl h-5/6' />
        </div>

        <div className='w-5/6 mx-auto'>
          <h2 className='text-3xl text-black font-bold text-left mb-2'>
            {info.title}
          </h2>
          <p className='text-xl '>{info.description}</p>
        </div>
      </div>
    </>
  )
}

export default FeatureCard
