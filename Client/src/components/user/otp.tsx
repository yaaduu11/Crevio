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
import { resendOtp } from "../../api/user"
import { useDispatch } from "react-redux"
import { setUser } from "../../redux/userSlice"


export function OtpForm({className, handleOtpVerification, successRoute, ApiType, ...props}: React.ComponentPropsWithoutRef<"div"> & {
  handleOtpVerification: (otp: string, email: string) => Promise<any>;
  successRoute: string;
  ApiType: string;
}) {
  const [value, setValue] = React.useState("")
  const [timer, setTimer] = useState(30)
  const [isResend, setIsResend] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  
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
        description: ApiType=='signup'? "Your registration data were lost. Please signup again." : "Your email were lost, Please retry again.",
        duration: 2500,
      });
      return;
    }
  
    if (isResend) {
      toast({
        variant: "destructive",
        description: "OTP expired. Please resend the OTP and try again.",
        duration: 2500,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await handleOtpVerification(value, email);
      if (response.success) {
        if(ApiType=='signup') {
          localStorage.removeItem("email");
          localStorage.setItem("accessToken", response.data.accessToken);
          dispatch(setUser({
              _id: response.user._id,
              name: response.user.name,
              email: response.user.email,
              role: response.user.role,
              accessToken: response.accessToken,
          }))
        }
        setTimeout(() => {
          setLoading(false);
          navigate(successRoute, ApiType=='signup'? { state: { fromOtp: true, userName: response.data.user.name },}: {});
        }, 2000);
      } else {
        setLoading(false);
        toast({
          variant: "destructive",
          description: response.error,
          duration: 2500,
        });
      }
    } catch (error) {
      console.error("Error when verifying OTP:", error);
      setLoading(false);
      toast({
        variant: "destructive",
        description: "Internal server error",
        duration: 2500,
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
