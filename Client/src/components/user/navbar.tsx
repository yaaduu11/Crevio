import { useNavigate } from 'react-router-dom'
import { userRoutes } from '../../constants'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser as faUserSolid } from "@fortawesome/free-solid-svg-icons";
import { faBell as faBellSolid } from '@fortawesome/free-solid-svg-icons';
import { faUser as faUserRegular } from "@fortawesome/free-regular-svg-icons";
import { faBell as faBellRegular } from '@fortawesome/free-regular-svg-icons';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { userLogout } from '../../api/user';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/storage';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/userSlice';
import { useEffect, useState } from 'react';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';




const Navbar = ({currentPage } : {currentPage : string}) => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState)=> state.user)
  const dispatch = useDispatch()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
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
            dispatch(removeUser())
            navigate(userRoutes.SIGNIN);
          }
      } catch (error) {
          console.error("Logout failed:", error);
      }
  };
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  }
  
  return (
    // <>
    //   <div className={`fixed left-0 w-full z-50 h-[110px] bg-[#D7FEC8] rounded-br-[80px] top-0 flex items-center justify-between px-8 `}>
    //     <h1 className="text-[#00835B] font-K2D text-5xl mb-2 font-semibold cursor-pointer" onClick={()=>navigate(userRoutes.HOME)}>
    //       Crevio
    //     </h1>

    //     { user.accessToken && <div className="absolute flex space-x-8 transform -translate-x-1/2 left-1/2">
    //       {Object.keys(pageRoutes).map((page) => {
    //         const isCurrentPage = currentPage === page;
    //         return (
    //           <button 
    //             key={page} 
    //             onClick={() => navigate(pageRoutes[page])} 
    //             className={`relative inline-block text-md font-medium text-[#09573f] font-Montserrat ${pageFocus(page)} after:content-[''] after:block after:h-[0.5px] after:bg-[#09573f] after:absolute after:bottom-0 after:left-1/2 after:transition-all after:duration-700 after:ease-out after:origin-center after:-translate-x-1/2 ${
    //               isCurrentPage ? "after:w-full" : "after:w-0 hover:after:w-full"
    //             }`}
                
    //           >
    //             {page}
    //           </button>
    //         );
    //       })}
    //     </div> }
        
    //     {user.accessToken && <div>
    //       {currentPage=="notifications"? <FontAwesomeIcon className='pr-5 text-xl' icon={faBellSolid}/> : <FontAwesomeIcon className='pr-5 text-xl' icon={faBellRegular}/>}
    //       <Popover>
    //         <PopoverTrigger asChild> 
    //           <button className="text-xl pr-14 focus:outline-none">
    //             {currentPage=="profile"? <FontAwesomeIcon icon={faUserSolid}/> : <FontAwesomeIcon icon={faUserRegular}/>}
    //           </button>
    //         </PopoverTrigger>

    //         <PopoverContent
    //           className="absolute right-0 p-2 mt-2 bg-white border rounded-lg shadow-md top-full w-28"
    //           align="end" 
    //           side="bottom" 
    //           sideOffset={6} 
    //         >
    //           <button className="block w-full px-2 py-1 text-sm text-left text-black rounded-md hover:bg-gray-200" onClick={()=>navigate(userRoutes.DASHBOARD)}>
    //             Dashboard
    //           </button>
    //           <button
    //             className="block w-full px-2 py-1 text-sm text-left text-black rounded-md hover:bg-gray-200"
    //             onClick={handleLogout}
    //           >
    //             Logout
    //           </button>
    //         </PopoverContent>
    //       </Popover>
    //     </div> }
        
    //     {!user.accessToken && <div className='pr-12'>
    //       <button className="flex justify-center items-center h-8 w-24 p-0 text-md bg-[#126d52] text-white rounded-xl hover:bg-[#1a664f] font-Montserrat" onClick={()=>navigate(userRoutes.SIGNIN)}>Sign In</button>
    //     </div>}

    //   </div>
    // </>
    
    <>
      <div className="fixed left-0 w-full z-50 h-[110px] bg-[#D7FEC8] rounded-br-[80px] top-0 flex items-center justify-between px-8">
        <h1 className="text-[#00835B] font-K2D text-5xl mb-2 font-semibold cursor-pointer" onClick={() => navigate(userRoutes.HOME)}>
          Crevio
        </h1>

        {user.accessToken && (
          <div className="absolute hidden space-x-8 transform -translate-x-1/2 md:flex left-1/2">
            {Object.keys(pageRoutes).map((page) => {
              const isCurrentPage = currentPage === page;
              return (
                <button
                  key={page}
                  onClick={() => navigate(pageRoutes[page])}
                  className={`relative inline-block text-md font-medium text-[#09573f] font-Montserrat ${pageFocus(page)} after:content-[''] after:block after:h-[0.5px] after:bg-[#09573f] after:absolute after:bottom-0 after:left-1/2 after:transition-all after:duration-700 after:ease-out after:origin-center after:-translate-x-1/2 ${
                    isCurrentPage ? "after:w-full" : "after:w-0 hover:after:w-full"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
        )}

        <div className="flex items-center">
          {user.accessToken && (
            <>
              {/* Hamburger menu for mobile */}
              <button 
                className="md:hidden mr-4 text-xl text-[#09573f] focus:outline-none" 
                onClick={toggleMobileMenu}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
              
              {/* Notification icon */}
              <div className="mr-4">
                {currentPage === "notifications" ? (
                  <FontAwesomeIcon className="text-xl" icon={faBellSolid} />
                ) : (
                  <FontAwesomeIcon className="text-xl" icon={faBellRegular} />
                )}
              </div>
              
              {/* User profile popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-xl focus:outline-none">
                    {currentPage === "profile" ? (
                      <FontAwesomeIcon icon={faUserSolid} />
                    ) : (
                      <FontAwesomeIcon icon={faUserRegular} />
                    )}
                  </button>
                </PopoverTrigger>

                <PopoverContent
                  className="absolute right-0 p-2 mt-2 bg-white border rounded-lg shadow-md top-full w-28"
                  align="end"
                  side="bottom"
                  sideOffset={6}
                >
                  <button
                    className="block w-full px-2 py-1 text-sm text-left text-black rounded-md hover:bg-gray-200"
                    onClick={() => navigate(userRoutes.DASHBOARD)}
                  >
                    Dashboard
                  </button>
                  <button
                    className="block w-full px-2 py-1 text-sm text-left text-black rounded-md hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </PopoverContent>
              </Popover>
            </>
          )}

          {!user.accessToken && (
            <div>
              <button
                className="flex justify-center items-center h-8 w-24 p-0 text-md bg-[#126d52] text-white rounded-xl hover:bg-[#1a664f] font-Montserrat"
                onClick={() => navigate(userRoutes.SIGNIN)}
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeMobileMenu}></div>
          
          {/* Sidebar */}
          <div className="absolute top-0 right-0 w-64 h-full transition-transform duration-300 ease-in-out transform bg-white shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-[#00835B]">Menu</h2>
              <button className="text-xl focus:outline-none" onClick={closeMobileMenu}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            
            <div className="p-4">
              {user.accessToken && Object.keys(pageRoutes).map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    navigate(pageRoutes[page]);
                    closeMobileMenu();
                  }}
                  className={`block w-full py-3 px-2 text-left rounded-md text-[#09573f] font-Montserrat ${
                    currentPage === page ? "font-semibold bg-[#D7FEC8]" : "hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar;