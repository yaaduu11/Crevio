import { AdminSidebar } from '../../components/admin/adminSidebar'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { SubscriptionPlan, SubscriptionPlanType } from '../../types/adminTypes';
import { ComboboxPopover } from '../../components/ui/combobox';
import { useEffect, useState } from 'react';
import { addSubscriptionPlan, getAllPlans } from '../../api/admin';

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
    const [plans, setPlans] = useState<SubscriptionPlanType[]>()
    const [editPlanModal, setEditPlanModal] = useState(false)
    const [viewPlanModal, setViewPlanModal] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanType | null>(null);

    const [formData, setFormData] = useState({
      freelancer_services: Array(4).fill(""),
      client_services: Array(4).fill(""),
      price: "",
    });
    
    useEffect(() => {
      const getPlans = async() => {
        try {
          const response = await getAllPlans()
          if(response.success){
            setPlans(response.data.plans)
          }
        } catch (error) {
          console.log(error);
        }
      }
      getPlans()
    },[])
  
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number,
      type: "freelancer" | "client"
    ) => {
      const key = `${type}_services` as keyof typeof formData;
      const services = [...formData[key]];
      services[index] = e.target.value;
    
      setFormData({ ...formData, [key]: services });
    };
  
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, price: e.target.value });
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const subscriptionPlan: SubscriptionPlan = {
        price: Number(formData.price),
        freelancer_services: formData.freelancer_services.filter((s) => s.trim() !== ""),
        client_services: formData.client_services.filter((s) => s.trim() !== ""),
      };
      
      try {
        const response = await addSubscriptionPlan(subscriptionPlan)
        if(response.success){
          alert('success');
        }else{
          alert('failed');
        }
      } catch (error) {
         console.log(error);
      }
    };
    
    const editSubscription = () => {
      setEditPlanModal((prev) => !prev)
    };
    
    const openViewPlanModal = (plan: SubscriptionPlanType) => {
      setSelectedPlan(plan);
      setViewPlanModal(true);
    };
    
    const closeViewPlanModal = () => {
      setViewPlanModal(false);
      setSelectedPlan(null);
    };
    
    
  return (
    <div className="flex h-screen">
      <div className="w-64">
        <AdminSidebar currentPage="Subscriptions" />
      </div>

      <div className="flex-1 p-6 bg-[#000000] pl-16 pt-24">
        <div className='left-0 flex justify-between'>
          <ComboboxPopover statuses={statuses}/>
        </div>  
        <h1 className="mb-4 text-4xl font-normal text-center text-white font-Montserrat">Subscription Plans</h1>
        
        <div className="flex flex-col items-center pt-4">
          <div className="flex justify-center gap-16 mt-8">
            {plans?.map((plan, index) => (
              <Card className="relative p-6 text-center transition duration-500 ease-in-out transform border border-gray-300 shadow-md w-80 hover:-translate-y-4 ">
                  <div className="absolute px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-md top-3 left-3">
                      {plan.planName}
                  </div>
                  <CardHeader>
                      <p className="text-4xl font-normal text-black">
                          ₹{plan.price}<span className="text-base font-normal text-black">/month</span>
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
                          <button 
                            className="flex-1 px-2 py-2 text-lg bg-black text-white hover:bg-[#222222] rounded-l-2xl"
                            onClick={() => openViewPlanModal(plan)}
                          >
                            View
                          </button>

                          {/* <button className="flex-1 px-2 py-2 text-lg bg-black text-white hover:bg-[#222222] border-l border-r border-gray-500" onClick={editSubscription}>
                              Edit
                          </button> */}
                          <button className="flex-1 px-2 py-2 text-lg bg-black text-white hover:bg-[#222222] rounded-r-2xl">
                              {plan.status == 'Listed'? 'Unlist': 'List'}
                          </button>
                      </div>
                  </CardFooter>
              </Card>  
            ))}
          </div>
        </div>
      </div>
      
      {editPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>

          <div className="relative flex flex-col w-full max-w-3xl gap-4 p-8 mx-4 transition-all duration-500 ease-out transform bg-white rounded-lg animate-slideIn">
               <div className="relative flex items-center justify-center">
                <h1 
                  className="absolute right-0 text-3xl cursor-pointer font-Montserrat" 
                  onClick={editSubscription}
                >X
                </h1>

                <h1 className="text-[1.75rem] font-bold">
                  Edit Subscription Plan
                </h1>
              </div>

              {/*<div className="flex flex-col gap-6 mt-5">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  
                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold">Freelancer Services</h3>
                    <Input id="service1" name="service1" type="text" placeholder="Service 1" required />
                    <Input id="service2" name="service2" type="text" placeholder="Service 2" required />
                    <Input id="service3" name="service3" type="text" placeholder="Service 3" required />
                    <Input id="service4" name="service4" type="text" placeholder="Service 4" required />
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold">Client Services</h3>
                    <Input id="clientService1" name="clientService1" type="text" placeholder="Client Service 1" required />
                    <Input id="clientService2" name="clientService2" type="text" placeholder="Client Service 2" required />
                    <Input id="clientService3" name="clientService3" type="text" placeholder="Client Service 3" required />
                    <Input id="clientService4" name="clientService4" type="text" placeholder="Client Service 4" required />
                  </div>

                </div>

                <div className="flex justify-center mt-6">
                  <Input id="price" name="price" type="text" placeholder="Price (Monthly)" className="w-1/2" required />
                </div>
              </div> */}
              
              <form onSubmit={handleSubmit} className="w-full max-w-3xl p-8 bg-white rounded-lg">

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold">Freelancer Services</h3>
                    {formData.freelancer_services.map((_, index) => (
                      <input
                        key={index}
                        name={`freelancer_service${index + 1}`}
                        type="text"
                        placeholder={`Freelancer Service ${index + 1}`}
                        required
                        onChange={(e) => handleChange(e, index, "freelancer")}
                      />
                    ))}
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold">Client Services</h3>
                    {formData.client_services.map((_, index) => (
                      <input
                        key={index}
                        name={`client_service${index + 1}`}
                        type="text"
                        placeholder={`Client Service ${index + 1}`}
                        required
                        onChange={(e) => handleChange(e, index, "client")}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Price (Monthly)"
                    className="w-1/2"
                    required
                    onChange={handlePriceChange}
                  />
                </div>

                <div className="flex justify-end mt-4">
                  <button type="submit" className="px-4 py-2 text-white bg-black rounded-lg">Edit</button>
                </div>
              </form>

          </div>
        </div>
      )}
      
      {viewPlanModal && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative flex flex-col w-full max-w-3xl gap-4 p-8 mx-4 transition-all duration-500 ease-out transform bg-white rounded-lg animate-slideIn">

            <h2 className="text-2xl font-bold text-center">{selectedPlan.planName}</h2>
            <p className="text-xl text-center">₹{selectedPlan.price} / month</p>

            <div className="flex justify-between gap-6 mt-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Freelancer Services</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  {selectedPlan.freelancer_services.map((service, index) => (
                    <li key={index} className="p-2 bg-gray-100 rounded-md">{service}</li>
                  ))}
                </ul>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold">Client Services</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  {selectedPlan.client_services.map((service, index) => (
                    <li key={index} className="p-2 bg-gray-100 rounded-md">{service}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button 
                className="px-4 py-2 text-white bg-black rounded-lg" 
                onClick={closeViewPlanModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Subscriptions
