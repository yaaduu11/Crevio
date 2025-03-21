import React,{ useEffect, useState } from 'react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '../ui/card';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { SubscriptionPlanType } from '../../types/adminTypes';
import { getAllPlans } from '../../api/admin';
import { handleCheckout } from '../../api/user';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/storage";

const PricingDetails = () => {
    const [plans, setPlans] = useState<SubscriptionPlanType[]>()
    const user = useSelector((state: RootState) => state.user);
    
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
        
  return (
    <div className="flex flex-col items-center pt-44">
      <h1 className="mb-2 text-4xl font-normal font-Montserrat">Prices and Features</h1>
      <p className="mb-6 text-center text-gray-600">
          Find the perfect plan for your needs.
      </p>
      <div className="flex justify-center gap-6 mt-8">
        {plans?.map((plan, index) => (
            <Card className={`relative p-6 text-center border  w-80 ${plan.most_popular? 'border-yellow-400': 'border-gray-300' }`}>
            <div className="absolute px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-md top-3 left-3">
                {plan.planName}
            </div>
            {plan.most_popular &&
            <div className="absolute px-3 py-2 text-sm text-white bg-yellow-400 rounded-md right-5 -top-3">
                Most Popular
            </div>
            }
            <CardHeader>
                <p className="text-4xl font-normal text-black">
                    ₹{plan.price}<span className="text-base font-normal text-black">/month</span>
                </p>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3 text-left text-gray-700">
                    <li className="flex items-center">
                        <span className="mr-2"><FontAwesomeIcon icon={faCheck} className="text-xl text-green-600" /></span>
                        {plan.client_services[0]}
                    </li>
                    <li className="flex items-center">
                        <span className="mr-2"><FontAwesomeIcon icon={faCheck} className="text-xl text-green-600" /></span>
                        {plan.client_services[1]} 
                    </li>
                    <li className="flex items-center">
                        <span className="mr-2"><FontAwesomeIcon icon={faCheck} className="text-xl text-green-600" /></span>
                        {plan.client_services[2]}
                    </li>
                </ul>
            </CardContent>
            <CardFooter>
                <button
                    className={`w-full px-4 py-2 rounded-md ${plan.most_popular? 'text-white bg-[#1a664f] hover:bg-[#145240]' : 'text-green-700 border border-green-700 hover:bg-green-100'}`}
                    onClick={() => handleCheckout(plan._id, plan.price, user._id)}
                >
                    Go Premium
                </button>
            </CardFooter>
            </Card>
        ))}
        {/* <Card className="relative p-6 text-center border border-yellow-400 w-80">
        <div className="absolute px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-md top-3 left-3">
            standard
        </div>
        <div className="absolute px-3 py-2 text-sm text-white bg-yellow-400 rounded-md right-5 -top-3">
            Most Popular
        </div>
        <CardHeader>
            <p className="text-4xl font-normal text-black">
                ₹399<span className="text-base font-normal text-black">/month</span>
            </p>
        </CardHeader>
        <CardContent>
            <ul className="space-y-3 text-left text-gray-700">
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
            </ul>
        </CardContent>
        <CardFooter>
            <button className="w-full px-4 py-2 text-white bg-[#1a664f] rounded-md hover:bg-[#145240]">
            Go Premium
            </button>
        </CardFooter>
        </Card> */}

       
      </div>
    </div>

  );
};

export default PricingDetails;

