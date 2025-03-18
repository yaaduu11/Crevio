import React from 'react'
import { useEffect } from 'react'
import { OtpForm } from '../../components/user/otp'
import { useLocation, useNavigate } from 'react-router-dom'
import { userRoutes } from '../../constants/routeUrl'
import { verifyOtp, verifyOtpFP } from '../../api/user'

const Otp = () => {
  const location = useLocation()
  
  const ApiType = location.state?.type
  const handleOtpVerification = ApiType==='signup'? verifyOtp: verifyOtpFP
  const sucessRoute = ApiType=='signup'? userRoutes.HOME: userRoutes.NEW_PASSWORD

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF5E3]">
        <h1 className="text-[#00835B] font-K2D text-5xl mb-2 font-semibold">Crevio</h1>
        <div className="w-full max-w-xl p-6"> 
          <OtpForm handleOtpVerification={handleOtpVerification} successRoute={sucessRoute} ApiType={location.state?.type}/>
      </div>
    </div>
    
  )
}

export default Otp
