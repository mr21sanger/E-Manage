import { useContext, createContext, useReducer, useEffect } from "react"
import axios from 'axios'

const AdminProfile = createContext()

const initialState = {
  isLoading: false,
  adminProfile: [],
  allAdmin: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case "Loading":
      return {
        ...state,
        isLoading: true
      }

    case "profile":
      return {
        ...state,
        isLoading: false,
        adminProfile: action.payload

      }

    case "allAdmins":
      return {
        ...state,
        isLoading: false,
        allAdmin: action.payload
      }
    default:
      return state
  }
}

const AdminState = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchAdmin = (_id) => {
    axios.get("http://localhost:8000/adminProfile/" + _id)
      .then((result) => {
        dispatch({ type: "Loading" })
        if (result?.data?.status) {
          dispatch({ type: "profile", payload: result?.data?.adminProfile })
        }
      })
      .catch((e) => console.log("this ", e))
  }

  const fetchAllAdmins = () => {
    axios.get("http://localhost:8000/admin")
      .then((result) => {
        dispatch({ type: "Loading" })
        if (result?.data?.status) {
          dispatch({ type: "allAdmins", payload: result?.data?.admin })
        }
      })
      .catch((e) => console.log(e))
  }

  return (
    <AdminProfile.Provider value={{ state, fetchAdmin, fetchAllAdmins }}>
      {children}
    </AdminProfile.Provider>
  )
}

const useAdminContext = () => {
  return useContext(AdminProfile)
}

export {
  AdminState,
  useAdminContext
}