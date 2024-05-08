import React, { useEffect, useState } from 'react'
import "../Components/css/style.css"
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import Dashboard from './Dashboard';
import { useAdminContext } from '../Reducer/AdminProfile';
function LoginPage() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(null)
  const [id, setId] = useState(null)
  const navigate = useNavigate()
  const { fetchAdmin } = useAdminContext()
  axios.defaults.withCredentials = true;

  const handleForm = (e) => {
    e.preventDefault();
    console.log(values)
    axios.post("http://localhost:8000/login", values)
      .then((result) => {
        console.log(result)
        if (result?.data?.loginStatus) {
          localStorage.setItem('adminId', result?.data?.adminInfo._id)
          navigate(`/dashboard`)
          // setId(result?.data?.adminInfo._id)
        } else {
          setError(result?.data?.Error)
        }
      })
      .catch((e) => console.log(e))
  }


  return (
    <>
      <div className="w-full h-full loginPage flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-600 dark:border-gray-700 dark:bg-opacity-15">

          {/* LOGIN BOX */}
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900  dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleForm}>
              <div>
                <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Enter Email</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                  required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Enter Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) => setValues({ ...values, password: e.target.value })}
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-red-500 dark:text-red-600">
                  {error && `* ${error}`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                      I Agree, Terms and Conditions
                    </label>
                  </div>
                </div>

              </div>
              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
