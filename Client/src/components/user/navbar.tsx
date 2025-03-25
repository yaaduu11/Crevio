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

const Navbar = ({currentPage } : {currentPage : string}) => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState)=> state.user)
  const dispatch = useDispatch()
  
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
  
  return (
    <>
      <div className={`fixed left-0 w-full z-50 h-[110px] bg-[#D7FEC8] rounded-br-[80px] top-0 flex items-center justify-between px-8`}>
        <h1 className="text-[#00835B] font-K2D text-5xl mb-2 font-semibold cursor-pointer" onClick={()=>navigate(userRoutes.HOME)}>
          Crevio
        </h1>

        { user.accessToken && <div className="absolute flex space-x-8 transform -translate-x-1/2 left-1/2">
          {Object.keys(pageRoutes).map((page) => {
            const isCurrentPage = currentPage === page;
            return (
              <button 
                key={page} 
                onClick={() => navigate(pageRoutes[page])} 
                // className={`relative inline-block text-md font-medium text-[#09573f] font-Montserrat ${pageFocus(page)} ${
                //   !isCurrentPage &&
                //   "after:content-[''] after:block after:h-[0.5px] after:bg-[#09573f] after:w-0 after:absolute after:bottom-0 after:left-1/2 after:transition-all after:duration-700 after:ease-out after:origin-center after:-translate-x-1/2 hover:after:w-full"
                // }`}
                className={`relative inline-block text-md font-medium text-[#09573f] font-Montserrat ${pageFocus(page)} after:content-[''] after:block after:h-[0.5px] after:bg-[#09573f] after:absolute after:bottom-0 after:left-1/2 after:transition-all after:duration-700 after:ease-out after:origin-center after:-translate-x-1/2 ${
                  isCurrentPage ? "after:w-full" : "after:w-0 hover:after:w-full"
                }`}
                
              >
                {page}
              </button>
            );
          })}
        </div> }
        
        {user.accessToken && <div>
          {currentPage=="notifications"? <FontAwesomeIcon className='pr-5 text-xl' icon={faBellSolid}/> : <FontAwesomeIcon className='pr-5 text-xl' icon={faBellRegular}/>}
          <Popover>
            <PopoverTrigger asChild> 
              <button className="text-xl pr-14 focus:outline-none">
                {currentPage=="profile"? <FontAwesomeIcon icon={faUserSolid}/> : <FontAwesomeIcon icon={faUserRegular}/>}
              </button>
            </PopoverTrigger>

            <PopoverContent
              className="absolute right-0 p-2 mt-2 bg-white border rounded-lg shadow-md top-full w-28"
              align="end" 
              side="bottom" 
              sideOffset={6} 
            >
              <button className="block w-full px-2 py-1 text-sm text-left text-black rounded-md hover:bg-gray-200" onClick={()=>navigate(userRoutes.DASHBOARD)}>
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
        </div> }
        
        {!user.accessToken && <div className='pr-12'>
          <button className="flex justify-center items-center h-8 w-24 p-0 text-md bg-[#126d52] text-white rounded-xl hover:bg-[#1a664f] font-Montserrat" onClick={()=>navigate(userRoutes.SIGNIN)}>Sign In</button>
        </div>}

      </div>
    </>

  )
}

export default Navbar