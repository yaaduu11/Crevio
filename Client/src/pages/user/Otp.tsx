import React from 'react'
import { useEffect } from 'react'
import { OtpForm } from '../../components/user/otp'
import { useNavigate } from 'react-router-dom'
import { userRoutes } from '../../constants/routeUrl'

const Otp = () => {
  const navigate = useNavigate()
  
  useEffect(()=>{
    const accessToken = localStorage.getItem("accessToken")
    if(accessToken) navigate(userRoutes.HOME)
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF5E3]">
        <h1 className="text-[#00835B] font-K2D text-5xl mb-2 font-semibold">Crevio</h1>
        <div className="w-full max-w-xl p-6"> 
          <OtpForm/>
      </div>
    </div>
    
  )
}

export default Otp
