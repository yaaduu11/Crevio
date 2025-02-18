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
import { useToast } from "../../hooks/use-toast"
import "react-toastify/dist/ReactToastify.css";
import { resendOtp, verifyOtp } from "../../api/user"


export function OtpForm({className,...props}: React.ComponentPropsWithoutRef<"div">) {
  const [value, setValue] = React.useState("")
  const [timer, setTimer] = useState(30)
  const [isResend, setIsResend] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  const { toast } = useToast();

  const restartTimer=()=>{
      setTimer(30)
      return
  }
  
  useEffect(()=>{
    if(timer==0) {
      setIsResend(true)
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
    event.preventDefault();
    const email = localStorage.getItem("email");
    if (!email) {
      navigate(userRoutes.SIGNUP);
      toast({
        variant: "destructive",
        description:
          "Your registration data were lost. Please signup again.",
        duration: 3000,
      });
      return;
    }
  
    if (isResend) {
      toast({
        variant: "destructive",
        description: "OTP expired. Please resend the OTP and try again.",
        duration: 3000,
      });
      return;
    }
  
    setLoading(true);
    try {
      const response = await verifyOtp(value, email);
      if (response.success) {
        localStorage.removeItem("email");
        localStorage.setItem("accessToken", response.data.accessToken);
        setTimeout(() => {
          setLoading(false);
          navigate(userRoutes.HOME, {
            state: { fromOtp: true, userName: response.data.user.name },
          });
        }, 3000);
      } else {
        console.error("Error response:", response.error);
        setLoading(false);
        toast({
          variant: "destructive",
          description: response.error,
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error when verifying OTP:", error);
      setLoading(false);
      toast({
        variant: "destructive",
        description: "Internal server error",
        duration: 3000,
      });
    }
  };
  
  const HandleResendOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    restartTimer(); 
    setIsResend(false)
    
    const email = localStorage.getItem("email");
    if (!email) {
      navigate(userRoutes.SIGNUP);
      toast({
        variant: "destructive",
        description:
          "Your registration data were lost. Please sign up again.",
        duration: 3000,
      });
      return;
    }
  
    try {
      await resendOtp(email)
      toast({
        variant: "default",
        description: "A new OTP has been sent to your email.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error when resending OTP:", error);
      toast({
        variant: "destructive",
        description: "Failed to resend OTP. Please try again.",
        duration: 3000,
      });
    }
  };
  
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
                              <a className="text-blue-500 cursor-pointer hover:underline" onClick={HandleResendOtp}>Resend</a>
                          )}
                      </div> 
                  </div>
                </div>
                <div className="flex justify-center">
                    <Button type="button" className="w-1/4" onClick={handleSubmit} disabled={loading}>
                    {loading? (
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full border-t-black animate-spin"></div>
                    ): ('Verify')}
                    </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

    </div>
  )
}
