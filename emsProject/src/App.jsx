import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./Pages/LoginPage"
import Dashboard from "./Pages/Dashboard"
import Home from "./Pages/Home"
import Manage from "./Pages/Manage"
import Category from "./Pages/Category"
import Profile from "./Pages/Profile"
import CategoryForm from "./Pages/CategoryForm"
import AddForm from "./Pages/AddForm"
import EditForm from "./Pages/EditForm"
import EditCategory from "./Pages/EditCategory"
import HomePage from "./Pages/HomePage"
import EditProfile from "./Pages/EditProfile"

function App() {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} >
          <Route path="" element={<Home />} />
          <Route path="/dashboard/manageEmployee" element={<Manage />} />
          <Route path="/dashboard/manageEmployee/add" element={<AddForm />} />
          <Route path="/dashboard/editEmployee/:id" element={<EditForm />} />
          <Route path="/dashboard/category" element={<Category />} />
          <Route path="/dashboard/editCategory/:id" element={<EditCategory />} />
          <Route path="/dashboard/profile/:id" element={<EditProfile />} />
          <Route path="/dashboard/categoryForm" element={<CategoryForm />} />
          <Route path="/dashboard/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
