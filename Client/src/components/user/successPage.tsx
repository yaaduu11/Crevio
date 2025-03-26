import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkUserSubscribed, updateUserSubStatus } from "../../api/user";

const SuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);  

  const message =
    decodeURIComponent(location.search.replace("?", "")) ||
    "Your action was successful.";

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 800);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const check_UserSubscribed = async () => {
      try {
        const response = await checkUserSubscribed();
        if (response.success && response.data.planName) {
          await updateUserSubStatus(response.data.planName);
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    check_UserSubscribed()
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative p-10 text-center bg-white rounded-lg shadow-lg w-96">

        <div className="w-24 h-24 mx-auto mb-4">
          <img 
            src="https://img.icons8.com/color/96/000000/ok--v1.png" 
            alt="Success"
          />
        </div>

        <h1 className="text-3xl font-bold text-green-600">Success</h1>

        <p className="text-gray-600">{message}</p>

        <div
          className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
            showButton ? "translate-y-12 opacity-100" : "translate-y-0 opacity-0"
          }`}
        >
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 mt-8 text-white bg-green-600 shadow-md rounded-3xl hover:bg-green-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
