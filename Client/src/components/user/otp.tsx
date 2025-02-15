import * as React from "react"
import { useState, useEffect } from "react"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../ui/input-otp"
import { useNavigate } from "react-router-dom"
import { userRoutes } from "../../constants/routeUrl"
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from "../../services/axios"
import { verifyOtp } from "../../api/user"


export function OtpForm({className,...props}: React.ComponentPropsWithoutRef<"div">) {
  const [value, setValue] = React.useState("")
  const [timer, setTimer] = useState(30)
  const [isResend, setIsRecend] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
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
  
  const handleChange = (newOtp: string) => {
     if(loading) return 
     const otp = newOtp.replace(/\D/g, '')
     setValue(otp)
  }
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const email = localStorage.getItem("email")
    if(!email) {
      navigate(userRoutes.SIGNUP)
    }
     
    setLoading(true)
    try {
      localStorage.removeItem('email')
      const response = await verifyOtp(value ,email as string)
      if(response.success) {
        localStorage.setItem('accessToken', response.accessToken)
        setTimeout(()=>{
          setLoading(false)
          navigate(userRoutes.HOME, {state: {fromOtp:true}})
        },3000)
      }
    }catch(error) {
      console.log('error when verifying otp', error)
    }
  }
  
  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Verify Your Account</CardTitle>
          <CardDescription>
            We are sending as OTP to validate your<br/>email address, Hang on!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="flex justify-center">
                  <div className="space-y-2">
                    <InputOTP
                      maxLength={6}
                      value={value}
                      onChange={(value) => handleChange(value)}
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
                </div>
                <div className="flex justify-center">
                    <Button type="submit" className="w-1/4" onClick={handleSubmit} disabled={loading}>
                    {loading? (
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full border-t-black animate-spin"></div>
                    ): ('Verify')}
                    </Button>
                    {/* <Button onClick={handleToastError}>
                       click
                    </Button> */}
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

    </div>
  )
}
