import React from 'react'
import { Button } from './button'
import { useNavigate } from 'react-router-dom'
import { userRoutes } from '../../constants/routeUrl'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { userLogout } from '../../api/user';


const Navbar = ({currentPage } : {currentPage : string}) => {
  const navigate = useNavigate()
  const token = localStorage.getItem("accessToken")
  
  const pageFocus = (page: string) =>
    currentPage === page
      ? "relative after:content-[''] after:block after:h-[0.5px] after:bg-[#09573f] after:w-full after:absolute after:bottom-0 after:left-0"
      // ? "relative after:content-[''] after:block after:h-[0.5px] after:bg-[#127a5b] after:w-0 after:left-1/2 after:transition-all after:duration-400 after:ease-out after:absolute after:origin-center hover:after:w-full after:-translate-x-1/2"
      : "";
  
  
  const pageRoutes: { [key: string]: string } = {
    "projects": userRoutes.PROJECTS,
    "about us": userRoutes.ABOUT,
    "contact us": userRoutes.CONTACT,
    "pricing": userRoutes.PRICING,
  };
  
  const handleLogout = async () => {
      try {
          const response = await userLogout();
          if (response.success) {            
            localStorage.removeItem("accessToken");
            navigate(userRoutes.SIGNIN);
            localStorage.removeItem("hasShownModal")
          }
      } catch (error) {
          console.error("Logout failed:", error);
      }
  };
  
  return (
    <>
      <div className={`fixed left-0 w-full z-50 h-[110px] bg-[#D7FEC8] rounded-br-[80px] top-0 flex items-center justify-between px-8`}>
        <h1 className="text-[#00835B] font-K2D text-5xl mb-2 font-semibold cursor-pointer" onClick={()=>navigate(userRoutes.HOME)}>
          Crevio
        </h1>

        { token && <div className="absolute flex space-x-8 transform -translate-x-1/2 left-1/2">
          {Object.keys(pageRoutes).map((page) => {
            const isCurrentPage = currentPage === page;
            return (
              <button 
                key={page} 
                onClick={() => navigate(pageRoutes[page])} 
                className={`relative inline-block text-md font-medium text-[#09573f] font-Montserrat ${pageFocus(page)} ${
                  !isCurrentPage &&
                  "after:content-[''] after:block after:h-[0.5px] after:bg-[#09573f] after:w-0 after:absolute after:bottom-0 after:left-1/2 after:transition-all after:duration-700 after:ease-out after:origin-center after:-translate-x-1/2 hover:after:w-full"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div> }
        
        {token && <div>
          <FontAwesomeIcon className='pr-6 text-xl' icon={faBell} />
          {/* <FontAwesomeIcon className='text-xl pr-14 ' icon={faUser} /> */}
          <Popover>
            <PopoverTrigger asChild> 
              <button className="text-xl pr-14 focus:outline-none">
                <FontAwesomeIcon icon={faUser} />
              </button>
            </PopoverTrigger>

            <PopoverContent
              className="absolute right-0 p-2 mt-2 bg-white border rounded-lg shadow-md top-full w-28"
              align="end" 
              side="bottom" 
              sideOffset={6} 
            >
              <button className="block w-full px-2 py-1 text-sm text-left text-black rounded-md hover:bg-gray-200">
                Profile
              </button>
              <button
                className="block w-full px-2 py-1 text-sm text-left text-black rounded-md hover:bg-gray-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            </PopoverContent>
          </Popover>
        </div> }
        
        {!token && <div className='pr-12'>
          <button className="flex justify-center items-center h-8 w-24 p-0 text-md bg-[#126d52] text-white rounded-xl hover:bg-[#1a664f] font-Montserrat" onClick={()=>navigate(userRoutes.SIGNIN)}>Sign In</button>
        </div>}

      </div>
    </>

  )
}

export default Navbar