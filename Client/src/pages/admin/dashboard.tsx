import { useState } from "react";
import { AdminSidebar } from "../../components/admin/adminSidebar";
import { Card } from "../../components/ui/card";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminRoutes } from "../../constants/routeUrl";

const Dashboard = () => {
  const [cardHovered, setCardHovered] = useState(false)
  
  const navigate = useNavigate()
  
  useEffect(()=>{
      const accessToken = localStorage.getItem("accessToken")
      if(!accessToken) navigate(`/admin${adminRoutes.SIGNIN}`)
  })

  return (
    <div className="flex h-screen">
      <div className="w-64">
        <AdminSidebar currentPage="Dashboard" />
      </div>

      <div className="flex-1 p-6 bg-[#000000] pl-16 pt-24">
      <h1 className={`text-3xl text-white transition duration-1500 ease-in-out transform font-Montserrat ${cardHovered ? '-translate-y-4' : ''}`}>Welcome Admin</h1>
        <div className="flex gap-16 mt-8">
          <Card className="w-full max-w-md p-6 transition duration-700 ease-in-out transform shadow-md hover:-translate-y-4 hover:bg-purple-100 rounded-3xl" 
            onMouseEnter={() => setCardHovered(true)}
            onMouseLeave={() => setCardHovered(false)}
          >
            <h1 className="text-xl font-semibold">Total Profit</h1>
            <p className="mt-2 text-3xl font-semibold text-black">00000</p>
            <p className="mt-2 font-semibold text-green-700">+6%</p>
            <p className="mt-2 text-gray-600">from last month</p>
          </Card>

          <Card className="w-full max-w-md p-6 transition duration-700 ease-in-out transform shadow-md hover:-translate-y-4 hover:bg-purple-100 rounded-3xl">
            <h1 className="text-xl font-semibold">Subscribers</h1>
            <p className="mt-2 text-3xl font-semibold text-black">00000</p>
            <p className="mt-2 font-semibold text-green-700">+6%</p>
            <p className="mt-2 text-gray-600">from last month</p>
          </Card>
          
          <Card className="w-full max-w-md p-6 transition duration-700 ease-in-out transform shadow-md hover:-translate-y-4 hover:bg-purple-100 rounded-3xl">
            <h1 className="text-xl font-semibold">Projects</h1>
            <p className="mt-2 text-3xl font-semibold text-black">00000</p>
            <p className="mt-2 font-semibold text-green-700">+6%</p>
            <p className="mt-2 text-gray-600">from last month</p>
          </Card>
        </div>
      </div>
    </div>
  );
};


export default Dashboard;
