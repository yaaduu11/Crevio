import { useEffect, useState } from 'react'
import { AdminSidebar } from '../../components/admin/adminSidebar'
import {
  TableCaption,
} from '../../components/ui/table' 
import { _getFreelancers, freelancerBlock } from '../../api/admin'
import { UserTypes } from '../../types/adminTypes'
import { useToast } from '../../hooks/use-toast'
const ITEMS_PER_PAGE = 2;

const Freelancers = () => {
  const [freelancers, setFreelancers] = useState<UserTypes[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(freelancers.length / ITEMS_PER_PAGE);
  const [blockLoading, setBlockLoading]= useState<{ [key: string]: boolean }>({});
  const {toast} = useToast()


  const handlePageChange = (newPage:number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const displayedUsers = freelancers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  const freelancerBlockUnblock = async(userId: string)=> {
     setBlockLoading(prev => ({ ...prev, [userId]: true }));
      try {
        const response = await freelancerBlock(userId as string)
        if(response.success){
          setBlockLoading(prev => ({ ...prev, [userId]: false }));
          toast({
            variant: 'success',
            description: 'Freelancer status updated successfully.',
            duration: 1000
          })
          
          setFreelancers(prevFreelancers =>
            prevFreelancers.map(freelancer =>
              freelancer._id === userId ? { ...freelancer, isBlocked: !freelancer.isBlocked } : freelancer
            )
          );
        }else{
          toast({
            variant: 'destructive',
            description: response.error,
            duration: 2000
          })
        }
      }catch (error) {
        console.log(error);
      }
  }
  
  useEffect(()=>{
    const getFreelancers = async()=>{
      try {
        const response = await _getFreelancers()
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
        <TableCaption className='flex justify-center text-3xl font-semibold text-gray-200'>
          Freelancer Management
        </TableCaption>
        <div className="w-10/12 mt-10 border border-gray-200 rounded-xl dark:border-gray-700">
          <div className="overflow-x-auto rounded-t-xl">
            
            <table className="min-w-full text-lg bg-white divide-y-2 divide-gray-200 dark:divide-white dark:bg-[#000000]">
              <thead className="text-left bg-gray-1000">
                <tr>
                  <th className="px-6 py-3 font-bold text-gray-900 whitespace-nowrap dark:text-white">No.</th>
                  <th className="px-6 py-3 font-bold text-gray-900 whitespace-nowrap dark:text-white">Name</th>
                  <th className="px-6 py-3 font-bold text-gray-900 whitespace-nowrap dark:text-white">Email</th>
                  <th className="px-6 py-3 font-bold text-gray-900 whitespace-nowrap dark:text-white">Status</th>
                  <th className="px-6 py-3 font-bold text-gray-900 whitespace-nowrap dark:text-white">Subscribed</th>
                  <th className="px-6 py-3 font-bold text-gray-900 whitespace-nowrap dark:text-white">Registered Date</th>
                  <th className="px-6 py-3 font-bold text-gray-900 whitespace-nowrap dark:text-white">Actions</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {displayedUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td className="px-6 py-2 text-gray-700 whitespace-nowrap dark:text-gray-200">
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>
                    <td className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</td>
                    <td className="px-6 py-2 text-gray-700 whitespace-nowrap dark:text-gray-200">{user.email}</td>
                    <td className="px-6 py-2 text-gray-700 whitespace-nowrap dark:text-gray-200">{user.isBlocked ? "Blocked" : "Active"}</td>
                    <td className="px-6 py-2 text-gray-700 whitespace-nowrap dark:text-gray-200">{user.subscriptionType}</td>
                    <td className="px-6 py-2 text-gray-700 whitespace-nowrap dark:text-gray-200">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <button
                          className={user.isBlocked? `flex items-center justify-center h-6 text-white text-md rounded-md w-20 ${blockLoading[user._id]?'bg-green-400':'bg-green-600'}` : `flex items-center justify-center h-6 text-white text-md rounded-md w-16 ${blockLoading[user._id]?'bg-red-400':'bg-red-600'}`}
                          key={user._id}
                          onClick={()=>freelancerBlockUnblock(user._id)}
                          disabled={blockLoading[user._id]}
                        >
                          {blockLoading[user._id] ? (
                            <div className="w-4 h-4 border-2 border-gray-300 rounded-full border-t-red-600 animate-spin"></div>
                          ) : (
                            user.isBlocked? 'Unblock': 'Block'
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
          <div className="px-4 py-2 border-t border-gray-200 rounded-b-lg dark:border-gray-700 ">
            <ol className="flex justify-center gap-1 text-xs font-medium">
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`inline-flex items-center justify-center text-gray-900 bg-white border border-gray-100 rounded-sm size-7 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  &lt;
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i}>
                  <button
                    onClick={() => handlePageChange(i + 1)}
                    className={`block leading-6 text-center rounded-sm size-7 ${
                      currentPage === i + 1
                        ? "bg-gray-100 text-black"
                        // : "text-gray-900 bg-white border border-gray-100 dark:border-white dark:bg-gray-900 dark:text-white"
                        : "text-gray-900 border border-gray-100 dark:border-gray-500 dark:text-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`inline-flex items-center justify-center text-gray-900 bg-white border border-gray-100 rounded-sm size-7 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  &gt;
                </button>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Freelancers
