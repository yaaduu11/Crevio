import { AdminSidebar } from '../../components/admin/adminSidebar'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { Input } from '../../components/ui/input';
import { ComboboxPopover } from '../../components/ui/combobox';
import { useState } from 'react';

type Status = {
  label: string,
  value: string
}

const statuses: Status[] = [
  {
    value: "base",
    label: "base",
  },
  {
    value: "standard",
    label: "standard",
  },
  {
    value: "extended",
    label: "extended",
  },
]

const Subscriptions = () => {
    const [addPlanModal, setAddPlanModal] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState("");

    
    const createSubscription = () => {
      setAddPlanModal((prev) => !prev)
    };
    
  return (
    <div className="flex h-screen">
      <div className="w-64">
        <AdminSidebar currentPage="Subscriptions" />
      </div>

      <div className="flex-1 p-6 bg-[#000000] pl-16 pt-24">
        <div className='left-0 flex justify-between'>
          <ComboboxPopover statuses={statuses}/>
          {/* <button className='w-20 mr-16 text-white border border-white rounded-lg hover:bg-white hover:text-black' onClick={createSubscription}>+ create</button> */}
        </div>  
        <h1 className="mb-4 text-4xl font-normal text-center text-white font-Montserrat">Subscription Plans</h1>
        
        <div className="flex flex-col items-center pt-4">
          <div className="flex justify-center gap-16 mt-8">
            <Card className="relative p-6 text-center border border-gray-300 w-80">
                <div className="absolute px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-md top-3 left-3">
                    base
                </div>
                <CardHeader>
                    <p className="text-4xl font-normal text-black">
                        ₹199<span className="text-base font-normal text-black">/month</span>
                    </p>
                </CardHeader>
                <CardContent className='mt-4 '>
                    {/* <ul className="space-y-3 text-left text-gray-700">
                        <li className="flex items-center">
                            <span className="mr-2"><FontAwesomeIcon icon={faCheck} className="text-xl text-green-600" /></span>
                            10 service postings
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2"><FontAwesomeIcon icon={faCheck} className="text-xl text-green-600" /></span>
                            10 service postings
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2"><FontAwesomeIcon icon={faCheck} className="text-xl text-green-600" /></span>
                            10 service postings
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2"><FontAwesomeIcon icon={faCheck} className="text-xl text-green-600" /></span>
                            10 service postings
                        </li>
                    </ul> */}
                </CardContent>
                <CardFooter className="absolute bottom-0 left-0 w-full ">
                    <div className="flex w-full">
                        <button className="flex-1 px-2 py-2 text-lg bg-black text-white hover:bg-[#222222] rounded-l-2xl ">
                            View
                        </button>
                        <button className="flex-1 px-2 py-2 text-lg bg-black text-white hover:bg-[#222222] border-l border-r border-gray-500">
                            Edit
                        </button>
                        <button className="flex-1 px-2 py-2 text-lg bg-black text-white hover:bg-[#222222] rounded-r-2xl">
                            Delete
                        </button>
                    </div>
                </CardFooter>
            </Card>  



            <Card className="relative p-6 text-center border border-gray-400 w-80">
                <div className="absolute px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-md top-3 left-3">
                    standard
                </div>
                <CardHeader>
                    <p className="text-4xl font-normal text-black">
                        ₹399<span className="text-base font-normal text-black">/month</span>
                    </p>
                </CardHeader>
                <CardContent className='mt-4 '>
                </CardContent>
                <CardFooter className="absolute bottom-0 left-0 w-full">
                    <div className="flex w-full">
                        <button className="flex-1 px-2 py-2 text-lg bg-black text-white hover:bg-[#222222] rounded-l-2xl ">
                            View
                        </button>
                        <button className="flex-1 px-2 py-2 text-lg bg-black text-white hover:bg-[#222222] border-l border-r border-gray-500">
                            Edit
                        </button>
                        <button className="flex-1 px-2 py-2 text-lg bg-black text-white hover:bg-[#222222] rounded-r-2xl">
                            Delete
                        </button>
                    </div>
                </CardFooter>
            </Card>

            <Card className="relative p-6 text-center border border-gray-300 w-80">
                <div className="absolute px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-md top-3 left-3">
                    extended
                </div>
                <CardHeader>
                    <p className="text-4xl font-normal text-black">
                        ₹799<span className="text-base font-normal text-black">/month</span>
                    </p>
                </CardHeader>
                <CardContent className='mt-4 '>
                </CardContent>
                <CardFooter className="absolute bottom-0 left-0 w-full">
                    <div className="flex w-full">
                        <button className="flex-1 px-2 py-2 text-lg bg-black text-white hover:bg-[#222222] rounded-l-2xl ">
                            View
                        </button>
                        <button className="flex-1 px-2 py-2 text-lg bg-black text-white hover:bg-[#222222] border-l border-r border-gray-500">
                            Edit
                        </button>
                        <button className="flex-1 px-2 py-2 text-lg bg-black text-white hover:bg-[#222222] rounded-r-2xl">
                            Delete
                        </button>
                    </div>
                </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      {addPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
  
          <div className="relative flex flex-col w-full max-w-3xl gap-4 p-8 mx-4 transition-all duration-500 ease-out transform bg-white rounded-lg animate-slideIn">
              <h1 className='text-3xl cursor-pointer font-Montserrat text-end' onClick={createSubscription}>X</h1>
              <h1 className="mt-0 text-[1.75rem] font-bold text-center"> 
                Add Subscription Plan
              </h1>
            
            <div className="flex flex-col gap-4 mt-4 mb-12 sm:flex-row">      
                  <select
                    id="name"
                    name="name"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={selectedPlan} // Controlled value
                    onChange={(e) => setSelectedPlan(e.target.value)} // Update state
                  >
                    <option value="" disabled>
                      Plan Name
                    </option>
                    <option value="basic">Basic</option>
                    <option value="standard">Standard</option>
                    <option value="extended">Extended</option>
                  </select>



                  <Input
                    id="price"
                    name="price"
                    type="text"
                    placeholder="price in monthly"
                    // value={formData.email}
                    // onChange={handleChange}
                    required
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="crevio@gmail.com"
                    // value={formData.email}
                    // onChange={handleChange}
                    required
                  />
              
            </div>
    
            <div className="flex justify-end">
              <button
                className={`px-6 py-2 bg-black text-white rounded hover:bg-slate-900 opacity-50 cursor-not-allowed`}
                // disabled={!isNextEnabled || loading}
                // onClick={HandleAssignRole}
              >
                {/* {loading? (<div className="w-4 h-4 border-2 border-gray-300 rounded-full border-t-black animate-spin"></div>): ('Next')} */}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Subscriptions
