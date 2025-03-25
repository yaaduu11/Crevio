import React from 'react'
import { useState } from "react"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"
import { useNavigate } from "react-router-dom"
import { userRoutes } from "../../constants"
import { validatePassword } from '../../utils/validation'
import { Eye, EyeOff } from 'lucide-react'
import { newPassword } from '../../api/user'
import { useToast } from '../../hooks/use-toast'

const new_password = ({className,...props}: React.ComponentPropsWithoutRef<"div">) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({field: '', message: ''})
    const [passwords, setPasswords] = useState({password: '', confirmPassword: ''})
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);
    
    
    const navigate =useNavigate()
    const {toast} = useToast()
    
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setPasswords({...passwords, [name]: value});
        const validationError = validatePassword(name, value, passwords);
        setError(validationError);
    }
    
    const handleSubmit = async(e: React.FormEvent) =>{
      e.preventDefault()
      setLoading(true)
      
      try {
        const email = localStorage.getItem("email")
        const response = await newPassword(passwords.password, email as string)

        if(response.success){
            localStorage.removeItem("email")
            setLoading(false)
            toast({
              variant: 'success',
              description: 'Password has been changed successfully.',
              duration: 3000
            })
            navigate(userRoutes.SIGNIN)
        }else{
          setLoading(false)
            toast({
              variant: 'destructive',
              description: response.error,
              duration: 2500
            })
        }
      } catch (error) {
          console.log(error);
          toast({
            variant: 'destructive',
            description: 'Internal Server Error',
            duration: 2500
          })
      }
    }
    
    return (
        <div className={cn("flex flex-col gap-6 ", className)} {...props}>
          <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Set Your New Password</CardTitle>  
                <CardDescription>Enter your new password and confirm it to reset <br/> your account password.</CardDescription>  
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid gap-6">
                    
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative w-80">
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            className="pr-10 w-80"
                            value={passwords.password}
                            onChange={handleChange}
                            placeholder="New Password"
                            required
                          />
                          <button
                            type="button"
                            className={`absolute right-3 flex items-center transition-all ${
                              error.field === "password" ? "-top-[-17%]" : "top-1/2 transform -translate-y-1/2"
                            }`}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                          {error.field === "password" && (
                            <p className="text-xs text-red-500">{error.message}</p>
                          )}
                      </div>

                      <div className="relative w-80">
                          <Input 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type={showConfirmPassword ? "text" : "password"}
                            className="w-80" 
                            value={passwords.confirmPassword} 
                            onChange={handleChange} 
                            placeholder='Confirm Password'
                            required 
                          />
                          <button
                            type="button"
                            className={`absolute right-3 flex items-center transition-all ${
                              error.field === "confirmPassword" ? "-top-[-17%]" : "top-1/2 transform -translate-y-1/2"
                            }`}
                            onClick={() => setshowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                          {error.field === 'confirmPassword' && (
                            <p className="text-xs text-red-500">{error.message}</p>
                          )}
                      </div>
                    </div>

                    <div className="flex justify-center">   
                    <Button 
                      type="button" 
                      className="w-1/5" 
                      disabled={!!error.field || !!error.message || !passwords.password || !passwords.confirmPassword || loading} 
                      onClick={handleSubmit}
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full border-t-black animate-spin"></div>
                      ) : ('Update')}
                    </Button>

                    </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )
}

export default new_password
