import React from 'react'
import { Button } from './button'
import { useNavigate } from 'react-router-dom'
import { userRoutes } from '../../constants/routeUrl'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBell } from '@fortawesome/free-solid-svg-icons';


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
          <FontAwesomeIcon className='pr-5 text-xl ' icon={faBell} />
          <FontAwesomeIcon className='text-xl pr-14 ' icon={faUser} />
        </div> }
        
        {!token && <div className='pr-12'>
          <button className="flex justify-center items-center h-8 w-24 p-0 text-lg bg-[#126d52] text-white rounded-2xl hover:bg-[#1a664f] font-Montserrat" onClick={()=>navigate(userRoutes.SIGNIN)}>Sign In</button>
        </div>}

      </div>
    </>

  )
}

export default Navbar