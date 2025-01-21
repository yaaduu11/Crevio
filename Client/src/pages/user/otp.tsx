import React from 'react'
import { OtpForm } from '../../components/user/otp'

const Otp = () => {
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
