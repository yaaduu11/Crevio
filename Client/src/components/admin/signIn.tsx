import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { AdminInput } from "../ui/adminInput"
import { useState } from "react"
import { signin } from "../../api/admin"
import { useNavigate } from "react-router-dom"
import { adminRoutes } from "../../constants/routeUrl"

export function AdminLoginForm({className,...props}: React.ComponentPropsWithoutRef<"div">) {
    const navigate = useNavigate()
    
    const [loading, setLoading] = useState(false)
    const [adminData, setAdminData] = useState({email:'', password: ''})
    const [error, setError] = useState('')
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdminData({...adminData, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = async(e: React.FormEvent)=> {
        e.preventDefault()
        setError('')
        setLoading(true)
        
        try {
            const response = await signin(adminData.email, adminData.password)
            if (response.success) {
                localStorage.setItem("accessToken", response.data.accessToken)
                setTimeout(()=>{
                    navigate(`/admin${adminRoutes.DASHBOARD}`)
                },2000) 
            }
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false)  
        }
    }
    
  return (
    <div className={cn("flex flex-col relative items-center", className)} {...props}>
        <form className="relative w-fit"> 
            <div className="relative flex flex-col">
            <AdminInput
                id="email"
                type="email"
                placeholder="Email address"
                value={adminData.email}
                name="email"
                required
                onChange={handleChange}
                className="bg-[#1A1A1A] text-white border-none pl-7 h-16 
                        rounded-t-3xl rounded-b-none w-[442px] text-lg
                        focus:outline-none focus:ring-0 focus:border-none"
            />
            <AdminInput
                id="password"
                type="password"
                required
                placeholder="Password"
                value={adminData.password}
                name="password"
                onChange={handleChange}
                className="bg-[#1A1A1A] text-white border-none pl-7 h-16 
                        rounded-b-3xl rounded-t-none w-[442px] text-lg
                        focus:outline-none focus:ring-0 focus:border-none"
            />
            </div>

            <Button 
            type="submit" 
            className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2
                        w-16 h-16 rounded-full flex items-center justify-center text-lg bg-[#1A1A1A] border-[#000000] border-4 hover:bg-[#2C2C2C]"
            disabled={loading}
            onClick={handleSubmit}
            >
            {loading? (
                <div className="w-4 h-4 border-2 border-gray-300 rounded-full border-t-black animate-spin" ></div>
            ):('➤')}
            </Button>
        </form>
    </div>



  )
}

