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
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useNavigate } from "react-router-dom"
import { userRoutes } from "../../constants/routeUrl"
import { useToast } from "../../hooks/use-toast"
import { emailRegex } from "../../validation/regex"
import { forgotPassword } from "../../api/user"

export function ForgotPasswordCard({className,...props}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [disabled, setDisabled] = useState(true)
  
  const navigate = useNavigate()
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)    
    
    if(newEmail.trim()=="" || !emailRegex.test(newEmail.trim())) {
      setError('Enter a valid email.')
      setDisabled(true)
    }else {
      setError('')
      setDisabled(false)
    }
  }
  
  const handleSubmit = async(e: React.FormEvent) =>{
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await forgotPassword(email)
      
      if(response.success){
        localStorage.setItem("email", email)
        setLoading(false)
        navigate(userRoutes.OTP, { state: { type: "forgot_password" }})
      }else{
        setTimeout(()=>{
          setLoading(false)
          toast({
            variant: "destructive",
            description: response.error,
            duration: 2500
          })
        }, 1200)
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
      toast({
        variant: "destructive",
        description: "Internal Server Error",
        duration: 2500,
      });
    }
  }
  
  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl ">Forgot Password !?</CardTitle>
          <CardDescription>
          Enter your email address, and we will <br/> give you reset instruction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="flex justify-center">
                  <div className="space-y-2">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="crevio@gmail.com"
                            className="w-80"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                        {error !== '' ? (
                            <p className="text-xs text-red-500">{error}</p>
                        ) : null}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                    <Button type="button" className="w-1/4" disabled={disabled || loading} onClick={handleSubmit}>
                    {loading? (
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full border-t-black animate-spin"></div>
                    ): ('Submit')}
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
