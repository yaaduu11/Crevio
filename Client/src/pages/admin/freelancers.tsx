import { useEffect, useState } from 'react'
import { AdminSidebar } from '../../components/admin/adminSidebar'
import {
  TableCaption,
} from '../../components/ui/table' 
import { _getFreelancers } from '../../api/admin'
import { UserTypes } from '../../types/adminTypes'

const Freelancers = () => {
  const [freelancers, setFreelancers] = useState<UserTypes[]>([])
  
  useEffect(()=>{
    const getFreelancers = async()=>{
      try {
        const token = localStorage.getItem("accessToken")
        const response = await _getFreelancers(token as string)
        if(response.success){
           setFreelancers(response.data.freelancers)
        }
      } catch (error) {
        console.log(error);  
      }
    }
    getFreelancers()
  },[]);
  
  return (
    <div className="flex h-screen">
      <div className="w-64">
        <AdminSidebar currentPage="Freelancers" />
      </div>

      <div className="flex-1 p-6 bg-[#000000] pl-40 pt-24">
      <TableCaption className='flex justify-center text-3xl font-semibold text-gray-200'>Freelancer Management</TableCaption>

        <div className="w-10/12 mt-10 border border-gray-200 rounded-xl dark:border-gray-700">
          <div className="overflow-x-auto rounded-t-xl">
            <table
              className="min-w-full text-sm bg-white divide-y-2 divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
            >
              <thead className="text-left">
                <tr>
                  <th className="px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white ">
                    No.
                  </th>
                  <th className="px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white ">
                    Name
                  </th>
                  <th className="px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white ">
                    Email
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Status
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Subscribed
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Registered Date
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {freelancers.map((user, index)=> (
                  <tr key={user._id}>
                    <td className="px-4 py-2 text-gray-700 whitespace-nowrap dark:text-gray-200">{index+1}</td>  
                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</td>
                    <td className="px-4 py-2 text-gray-700 whitespace-nowrap dark:text-gray-200">{user.email}</td>
                    <td className="px-4 py-2 text-gray-700 whitespace-nowrap dark:text-gray-200">{user.isBlocked ? "Blocked" : "Active"}</td>
                    <td className="px-4 py-2 text-gray-700 whitespace-nowrap dark:text-gray-200">{user.subscriptionType}</td>
                    <td className="px-4 py-2 text-gray-700 whitespace-nowrap dark:text-gray-200">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <button className="px-3 py-1 text-black bg-gray-200 rounded-md hover:bg-gray-400">
                          View
                        </button>
                        <button className="px-3 py-1 text-black bg-red-400 rounded-md hover:bg-red-500">
                          block
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
              </tbody>
            </table>
          </div>

          <div className="px-4 py-2 border-t border-gray-200 rounded-b-lg dark:border-gray-700">
            <ol className="flex justify-center gap-1 text-xs font-medium">
              <li>
                <a
                  href="#"
                  className="inline-flex items-center justify-center text-gray-900 bg-white border border-gray-100 rounded-sm size-8 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                >
                  <span className="sr-only">Prev Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block leading-8 text-center bg-blue-600 border-blue-600 rounded-sm size-8 dark:text-white"
                >
                  1
                </a>
              </li>

              <li
                className="block leading-8 text-center text-gray-900 bg-white border border-gray-100 rounded-sm size-8 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
              >
                2
              </li>

              <li>
                <a
                  href="#"
                  className="block leading-8 text-center text-gray-900 bg-white border border-gray-100 rounded-sm size-8 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                >
                  3
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block leading-8 text-center text-gray-900 bg-white border border-gray-100 rounded-sm size-8 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                >
                  4
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="inline-flex items-center justify-center text-gray-900 bg-white border border-gray-100 rounded-sm size-8 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                >
                  <span className="sr-only">Next Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ol>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Freelancers
