import { AdminSidebar } from "../../components/admin/adminSidebar";
import { Card } from "../../components/ui/card";


// const Dashboard = () => {
//   return (
//     <>
//       <div className="flex flex-col">
//         <div>
//           <AdminSidebar currentPage="Dashboard"/>
//         </div>
      
//         <div>
//           <Card className="w-full max-w-md p-6 shadow-md">
//           <h2 className="text-lg font-semibold">Welcome to the Admin Panel</h2>
//           <p className="mt-2 text-gray-600">Manage users, subscriptions, and more.</p>
//           </Card>
//         </div>     
//       </div>      
//     </>
//   );
// };
const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <div className="w-64">
        <AdminSidebar currentPage="Dashboard" />
      </div>

      <div className="flex-1 p-6 bg-[#2C2C2C] pl-16 pt-24">
        <div className="flex gap-16">
          <Card className="w-full max-w-md p-6 shadow-md">
            <h1 className="text-xl font-semibold">Total Profit</h1>
            <p className="mt-2 text-3xl font-semibold text-black">00000</p>
            <p className="mt-2 font-semibold text-green-700">+6%</p>
            <p className="mt-2 text-gray-600">from last month</p>
          </Card>

          <Card className="w-full max-w-md p-6 shadow-md">
            <h1 className="text-xl font-semibold">Subscribers</h1>
            <p className="mt-2 text-3xl font-semibold text-black">00000</p>
            <p className="mt-2 font-semibold text-green-700">+6%</p>
            <p className="mt-2 text-gray-600">from last month</p>
          </Card>
          
          <Card className="w-full max-w-md p-6 shadow-md">
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
