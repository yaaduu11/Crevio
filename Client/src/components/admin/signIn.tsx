import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { AdminInput } from "../ui/adminInput";
import { useState } from "react";
import { signin } from "../../api/admin";
import { useNavigate } from "react-router-dom";
import { adminRoutes } from "../../constants/routeUrl";
import { useToast } from "../../hooks/use-toast";
import { setAdmin } from "../../redux/adminSlice";
import { useDispatch } from "react-redux";
import Loader from "../ui/loader";

export function AdminLoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [adminData, setAdminData] = useState({ email: '', password: '' });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (
      adminData.email.trim() === "" ||
      !emailRegex.test(adminData.email.trim()) ||
      adminData.password.trim() === ""
    ) {
      toast({
        variant: "destructive",
        description: "Enter a valid email and password.",
        duration: 3000,
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await signin(adminData.email, adminData.password);
      if (response.success) {
        localStorage.setItem("accessToken", response.data.accessToken);   
        dispatch(setAdmin({
          _id: response.data.admin._id,
          name: response.data.admin.name,
          email: response.data.admin.email,
          role: response.data.admin.role,
          accessToken: response.data.accessToken,
        }))
        
        setTimeout(() => {
          setLoading(false);
          navigate(`/admin${adminRoutes.DASHBOARD}`);
        }, 2000);
      } else {
        toast({
          variant: "destructive",
          description: "Admin credentials are incorrect.",
          duration: 3000,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Admin credentials are incorrect.",
        duration: 3000,
      });
      setLoading(false);
    }
  };
  
  return (
    <>
    {loading && <Loader onComplete={() => setLoading(false)} />}
    <div className={cn("flex flex-col relative items-center", className)} {...props}>
      <form className="relative w-fit" onSubmit={handleSubmit}>
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
                     w-16 h-16 rounded-full flex items-center justify-center text-lg 
                     bg-[#000000] border-[#000000] border-4 hover:bg-[#505050]"
          disabled={loading}
        >
          ➤
        </Button>
      </form>
    </div>
    </>
  );
}
