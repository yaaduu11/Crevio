import React from 'react'
import New_password from '../../components/user/new_password'

const NewPassword = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF5E3]">
            <h1 className="text-[#00835B] font-K2D text-5xl mb-1 font-semibold">Crevio</h1>
            
            <div className="w-full max-w-lg p-6">
              <New_password />
            </div>
      </div>
    </>
  )
}

export default NewPassword
