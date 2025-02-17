import React, { useEffect, useState } from 'react'
import { AdminSidebar } from '../../components/admin/adminSidebar'
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '../../components/ui/table' 
import { _getClients } from '../../api/admin'
import { UserTypes } from '../../types/adminTypes'


const Clients = () => {
  const [clients, setClients] = useState<UserTypes[]>([])
    
    useEffect(()=>{
      const getClients = async()=>{
        try {
          const token = localStorage.getItem("accessToken")
          const response = await _getClients(token as string)
          if(response.success){
            setClients(response.data.clients)
          }
        } catch (error) {
          console.log(error);  
        }
      }
      getClients()
    },[]);
    
  return (
      <div className="flex h-screen">
        <div className="w-64">
          <AdminSidebar currentPage="Clients" />
        </div>
  
        <div className="flex-1 p-6 bg-[#000000] pl-16 pt-24">
          <TableCaption className='flex justify-center text-3xl font-semibold text-gray-200'>Client Management</TableCaption>
          <Table className="w-11/12 mt-10 border border-gray-200 rounded-lg shadow-md">
  
          <TableHeader className="bg-gray-200 ">
            <TableRow>
              <TableHead className="text-lg text-left text-black font-Montserrat">ID</TableHead>
              <TableHead className="text-lg text-left text-black font-Montserrat">Name</TableHead>
              <TableHead className="text-lg text-left text-black font-Montserrat" >Email</TableHead>
              <TableHead className="text-lg text-left text-black font-Montserrat">Status</TableHead>
              <TableHead className="text-lg text-left text-black font-Montserrat">Subscribed</TableHead>
              <TableHead className="text-lg text-left text-black font-Montserrat">Registered Date</TableHead>
              <TableHead className="text-lg text-left text-black font-Montserrat">Actions</TableHead>
            </TableRow>
          </TableHeader>
  
          <TableBody>
          <TableRow key={0}>
                <TableCell className="text-lg font-medium text-left text-black">f</TableCell>
                <TableCell className="text-lg font-medium text-left text-white"></TableCell>
                <TableCell className="text-lg font-medium text-left text-white"></TableCell>
                <TableCell className="text-lg font-medium text-left text-white"></TableCell>
                <TableCell className="text-lg font-medium text-left text-white"></TableCell>
                <TableCell className="text-lg font-medium text-left text-white"></TableCell>
                <TableCell className="text-lg font-medium text-left text-white"></TableCell>
              </TableRow>
            {clients.map((user,index) => (
              <TableRow key={user._id} className="hover:bg-[#1a1a1a]">
                <TableCell className="text-lg font-medium text-left text-white">{index+1}</TableCell>
                <TableCell className="text-lg font-medium text-left text-white">{user.name}</TableCell>
                <TableCell className="text-lg font-medium text-left text-white">{user.email}</TableCell>
                <TableCell className="text-lg font-medium text-left text-white">{user.isBlocked ? "Blocked" : "Active"}</TableCell>
                <TableCell className="text-lg font-medium text-left text-white">{user.subscriptionType || "N/A"}</TableCell>
                <TableCell className="text-lg font-medium text-left text-white">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                </TableCell>
                <TableCell className="text-lg font-medium text-left text-white">
                  <div className="flex items-center space-x-3">
                    <button className="px-3 py-1 text-black bg-gray-200 rounded-md hover:bg-gray-400">
                      View
                    </button>
                    <button className="px-3 py-1 text-black bg-red-400 rounded-md hover:bg-red-500">
                      block
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
  
          
         <TableFooter className="bg-gray-100">
            <TableRow>
              <TableCell colSpan={7} className="text-lg font-semibold text-center">
                Total Users: {clients.length}
              </TableCell>
            </TableRow>
          </TableFooter>
          </Table>
        </div>
      </div>
   )
}

export default Clients
