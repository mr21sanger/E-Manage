import React from 'react'
import { SiNginxproxymanager } from 'react-icons/si'
import { NavLink, useNavigate } from 'react-router-dom'
import "../Components/css/animation.css"
import Footer from '../Components/Footer'
import { AiFillDatabase } from "react-icons/ai";
import HomeCard from '../Components/HomeCard'
import { MdOutlineSecurity } from "react-icons/md";
import { GrUserSettings } from "react-icons/gr";
import { RiFolderUserLine } from "react-icons/ri";
import { SiMicrosoftaccess } from "react-icons/si";
import FeatureCard from '../Components/FeatureCard'





function HomePage() {

  const infoCard = [
    {
      id: 0,
      title: "Increase employee data visibility across regions",
      logo: <AiFillDatabase />
    },
    {
      id: 1,
      title: "Guarantee secure data management and employee privacy",
      logo: <MdOutlineSecurity />
    },
    {
      id: 2,
      title: "Customize and manage your workforce in your preferred way",
      logo: <GrUserSettings />
    },
    {
      id: 3,
      title: "Empower your employees with self-service portals",
      logo: <RiFolderUserLine />
    }, {
      id: 4,
      title: "Access your database quickly and easily from your mobile device",
      logo: <SiMicrosoftaccess />
    },
  ]

  const featureBox = [{
    id: 0,
    title: "Insightful Control Hub: Empower Your Workforce, Optimize Operations Efficiently.",
    imgSrc: "https://imgs.search.brave.com/4xsHijHSO-tq0ub4LF9Nd8xf09gUOxJfY_9yFuL_uOg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/Y3V0ZWhyLmlvL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE5LzA0/LzIwMjAtMDQtMTct/NC0xNDAweDc5Mi5w/bmc",
    description: "Unlock insights, streamline tasks, and stay organized with our intuitive EMS dashboard. Monitor Employees, track Salary, and manage schedules effortlessly—all in one centralized hub for seamless workforce management."
  },
  {
    id: 1,
    title: "Effortlessly Manage Your Team with Our Intuitive Employee Management System.",
    imgSrc: "https://imgs.search.brave.com/3y1XI5Yle8PQ7NLwDJaUI5MKr5T7JIM7zytf1Sr9pug/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9saXJw/LmNkbi13ZWJzaXRl/LmNvbS9hOTljZWI1/MC9kbXMzcmVwL211/bHRpL29wdC9Ib3cr/dG8rTWFrZStFdmVy/eStIaXJlK0NvdW50/X0ltYWdlKzAyLTE5/MjB3LnBuZw",
    description: "Optimize staff management, track performance, and simplify HR tasks with our comprehensive Employee Management System. From scheduling to analytics, empower your business with efficient workforce management solutions tailored to your needs."
  }]

  const navigate = useNavigate()


  const handleClick = () => {
navigate("/login")
  }
  return (
    <>
      <div className='h-screen w-full no-scrollbar bg-gray-100 '>
        <nav className="bg-blue-500 border-blue-500 bg-opacity-90 ">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <h1 className='font-extrabold text-white font-mono text-4xl flex gap-2'><SiNginxproxymanager />E-Manage</h1>

            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border text-black border-gray-100 rounded-lg md:flex-row md:space-x-3 rtl:space-x-reverse md:mt-0 md:border-0 ">

                <li>
                  <a href="mailto:shiwang21sanger@gmail.com" className=" px-5 py-2 bg-white text-gray-900 text-2xl rounded hover:bg-gray-100 mx- "><span>Contact</span></a>
                </li>

                <li>
                  <NavLink to={"/login"} className=" px-5 py-2 text-gray-900 bg-white text-2xl rounded hover:bg-gray-100"><span>Login</span></NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className=' flex justify-center items-center gap-3 slide-in-elliptic-top-fwd' style={{ height: "90vh" }}>
          <div className='w-1/2 bg-red-10 h-5/6 flex flex-col gap-4 justify-center items-start z-20'>
            <h1 className='text-black font- font-bold text-5xl text-left w-5/6  '>
              Empower Your Workforce, Streamline Your Operations</h1>

            <p className='font-semibold text-xl '>Manage your global workforce with a flexible, employee database management system. Build a secure, comprehensive, and scalable database to get a better understanding of your workforce.</p>

            <button className='bg-blue-500 px-5 py-3 text-2xl rounded-xl heartbeat text-white font-bold' onClick={handleClick}>
              Get Started
            </button>
          </div>

          <div className='w-1/3 py-8 h-5/6 kenburns-bottom z-0'>
            <img src="https://www.pngarts.com/files/7/Management-Download-PNG-Image.png" alt="img"
              className='h-full w-full' />
          </div>

        </div>

        <div className=" w-11/12 mx-auto h-1/2 pl-8 p-5 mb-10 items-center grid grid-cols-5
        ">
          {
            infoCard.map((currElem) => {
              return (
                <HomeCard info={currElem} />
              )
            })
          }


        </div>

        <div className='w-full bg-opacity-25 h-3/6 mx-auto mb-16 bg-blue-500 text-center p-5'>
          <h1 className='font-bold text-5xl w-1/2 mx-auto my-5 font-serif'>Customize and build your organization</h1>
          <p className='w-1/2 mx-auto font-semibold text-xl font-serif'>
            Our employee management software empowers you to tailor your database precisely to your unique requirements, ensuring it functions exactly as you need it to.</p>
        </div>

        <div className='flex items-center justify-center gap-16  w-11/12 mx-auto h-full  mb-16'>
          {featureBox.map((currElem) => {
            return (
              <FeatureCard info={currElem} key={currElem.id} />
            )
          })}
        </div>

        <div className='w-full h-3/6 mx-auto mb-0.5 bg-yellow-200 text-center p-5'>
          <h1 className='font-bold text-5xl w-1/2 mx-auto my-5 font-serif'>Get Started with E-Manage for free!! </h1>

          <p className='w-1/2 mx-auto font-semibold text-lg italic mt-5 mb-10 font-serif'>
            "Streamline Your Workforce, Seamlessly."</p>

          <button to={"/login"} className='bg-blue-500 px-10 py-3 text-2xl rounded-lg heartbeat text-white font-bold' onClick={handleClick}>
            Sign UP For Free!!
          </button>



        </div>

        <Footer />

      </div>
    </>
  )
}

export default HomePage
