// /* eslint-disable no-unused-vars */

import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'   // ✅ added
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import AllApointments from './pages/Admin/AllApointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';

const App = () => {
  const { aToken } = useContext(AdminContext)

  return aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Dashboard />} /> {/* ✅ fixed */}
          <Route path='/admin-dashboard' element={<Dashboard />} /> {/* ✅ fixed */}
          <Route path='/all-appointments' element={<AllApointments />} /> {/* ✅ fixed */}
          <Route path='/add-doctor' element={<AddDoctor />} /> {/* ✅ fixed */}
          <Route path='/doctor-list' element={<DoctorsList />} /> {/* ✅ fixed */}
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
