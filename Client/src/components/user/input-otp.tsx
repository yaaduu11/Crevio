import * as React from "react"
import { useState, useEffect } from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../ui/input-otp"

export function InputOTPControlled() {
  const [value, setValue] = React.useState("")
  const [timer, setTimer] = useState(30)
  const [isResend, setIsRecend] = useState(false)
  
  const restartTimer=()=>{
     setTimer(30)
     return
  }
  
  useEffect(()=>{
    if(timer==0) {
      setIsRecend(true)
        return 
    }
    
    const interval = setInterval(()=>{
        setTimer((prev)=>prev-1)
    },1000)
    
    return ()=>clearInterval(interval)
  },[timer])

  return (
    <div className="space-y-2">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup className="space-x-1">
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      
        <div className="text-center tet-sm">
            {timer > 0 ? (
                <>OTP will expire in {timer} seconds.</>
            ) : (
                <a className="text-blue-500 cursor-pointer hover:underline" onClick={()=>restartTimer()}>Resend</a>
            )}
        </div>
    </div>
  )
}
