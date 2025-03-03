import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRoutes } from '../../routes/UserRoutes';
import { userRoutes } from '../../constants/routeUrl';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/storage';

const Sidebar = ({currentPage}: {currentPage: string}) => {
  const user = useSelector((state: RootState)=>state.user)
  const navigate = useNavigate()
  
  const menuItems = [
    { name: 'Dashboard', icon: '📊'}, 
    { name: 'Profile', icon: '👤' },
    // { name: 'Projects', icon: '📁' },
    { name: 'Messages', icon: '💬' },
    { name: 'Wallet', icon: '💰' },
    { name: 'Reviews', icon: '⭐' }
  ];

  return (
    <div className="h-screen p-4 pl-10 mt-12">
      <h1 className='pl-8 cursor-pointer text-md font-Montserrat' onClick={()=>navigate(userRoutes.HOME)}>&#10150; home</h1>
      <div className="flex flex-col p-6 mt-2 bg-white border shadow-xl w-60 h-5/6 rounded-2xl">
        {/* <div className="mb-4">
        </div> */}
        
        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a 
                  onClick={()=>navigate(`/${item.name.toLowerCase()}`)}
                //   className={`flex items-center p-3 text-gray-700 border-black hover:text-white transition-all duration-200 rounded-xl font-Montserrat ${currentPage== item.name? 'bg-[#126d52] text-white':''}`}
                  className={`flex items-center p-3 text-gray-700 border-black transition-all duration-200 rounded-xl font-Montserrat transform hover:scale-110 hover:shadow-md ${currentPage === item.name ? 'bg-[#126d52] text-white' : 'hover:text-[#126d52] hover:font-semibold'}`}

               >
                    {/* {user.role=='client' && item.name=='Projects'  }  */}
                      
                      <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="pt-4 mt-auto border-t border-gray-200">
          <a 
            href="#" 
            className="flex items-center p-3 text-gray-700 transition-all duration-200 rounded-xl hover:bg-gray-100"
          >
            <span className="mr-3">⚙️</span>
            <span>Settings</span>
          </a>
          {/* <a 
            href="#" 
            className="flex items-center p-3 text-gray-700 transition-all duration-200 rounded-xl hover:bg-gray-100"
          >
            <span className="mr-3">🚪</span>
            <span>Logout</span>
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;