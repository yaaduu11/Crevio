import React from 'react'
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

const Freelancers = () => {
  const users = [
    { id: 1, name: "john", email: "john@example.com", active: 'true',  subscribed: "false", registered_date: '10-10-2000' },
    { id: 2, name: "john", email: "john@example.com", active: 'true',  subscribed: "false", registered_date: '10-10-2000' },
    { id: 3, name: "john", email: "john@example.com", active: 'true',  subscribed: "false", registered_date: '10-10-2000' },
    { id: 4, name: "john", email: "john@example.com", active: 'true',  subscribed: "false", registered_date: '10-10-2000' },
    { id: 5, name: "john", email: "john@example.com", active: 'true',  subscribed: "false", registered_date: '10-10-2000' },
    
  ];
  return (
    <div className="flex h-screen">
      <div className="w-64">
        <AdminSidebar currentPage="Freelancers" />
      </div>

      <div className="flex-1 p-6 bg-[#2c2c2c] pl-16 pt-24">
        <TableCaption className='flex justify-center text-3xl font-semibold text-gray-200'>Freelancer Management</TableCaption>
        <Table className="w-11/12 mt-10 border border-gray-200 rounded-lg shadow-md">

        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead className="text-lg font-bold text-left text-black">ID</TableHead>
            <TableHead className="text-lg font-bold text-left text-black">Name</TableHead>
            <TableHead className="text-lg font-bold text-left text-black">Email</TableHead>
            <TableHead className="text-lg font-bold text-left text-black">Active</TableHead>
            <TableHead className="text-lg font-bold text-left text-black">Subscribed</TableHead>
            <TableHead className="text-lg font-bold text-left text-black">Registered Date</TableHead>
            <TableHead className="text-lg font-bold text-left text-black">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-[#464646]">
              <TableCell className="text-lg font-medium text-left text-white">{user.id}</TableCell>
              <TableCell className="text-lg font-medium text-left text-white">{user.name}</TableCell>
              <TableCell className="text-lg font-medium text-left text-white">{user.email}</TableCell>
              <TableCell className="text-lg font-medium text-left text-white">{user.active}</TableCell>
              <TableCell className="text-lg font-medium text-left text-white">{user.subscribed}</TableCell>
              <TableCell className="text-lg font-medium text-left text-white">{user.registered_date}</TableCell>
              <TableCell className="text-lg font-medium text-left text-white">
                <div className="flex items-center space-x-3">
                  <button className="px-3 py-1 text-black bg-gray-200 rounded-md hover:bg-gray-400">
                    View
                  </button>
                  <button className="px-3 py-1 text-black bg-red-400 rounded-md hover:bg-red-500">
                    Block
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter className="bg-gray-100">
          <TableRow>
            <TableCell colSpan={7} className="text-lg font-semibold text-center">
              Total Users: {users.length}
            </TableCell>
          </TableRow>
        </TableFooter>
        </Table>
      </div>
    </div>
  )
}

export default Freelancers
