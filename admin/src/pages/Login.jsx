/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from 'axios'
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");

  const[email,setemail]=useState('')
  const[password,setpassword]=useState('')

  const {setAToken,backendUrl}=useContext(AdminContext)

  const onSubmitHandler = async(event) =>{
event.preventDefault()

try {
  if (state === 'Admin') {
    
    const {data} = await axios.post(backendUrl + '/api/admin/login' , {email,password})
   if (data.success){
    localStorage.setItem('aToken',data.token)
    setAToken(data.token);
    
   }else{
     toast.error(data.message)
  }
   
   }else{

  
} }
catch (error) {
  
}
  }



  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg bg-white">
        
        {/* Title */}
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>

        {/* Email */}
        <div className="w-full">
          <p>Email</p>
          <input onChange={(e)=>setemail(e.target.value)} value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <p>Password</p>
          <input onChange={(e)=>setpassword(e.target.value)} value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>

        {/* Login Button */}
        <button 
          type="submit"
          className="bg-primary hover:bg-blue-700 text-white w-full py-2 rounded-md text-base mt-2"
        >
          Login
        </button>

        {/* Switch */}
        {state === "Admin" ? (
          <p className="mt-2">
            Doctor Login?{" "}
            <span 
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="mt-2">
            Admin Login?{" "}
            <span 
              className="text-primary cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
