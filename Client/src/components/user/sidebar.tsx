import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { userRoutes } from '../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/storage';

import {
  LayoutDashboard,
  User,
  MessageCircle,
  Wallet,
  Star,
  Folder,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const Sidebar = ({ currentPage }: { currentPage: string }) => {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 768);
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(prev => prev);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Profile', icon: <User size={20} /> },
    { name: 'Messages', icon: <MessageCircle size={20} /> },
    { name: 'Wallet', icon: <Wallet size={20} /> },
    { name: 'Reviews', icon: <Star size={20} /> }
  ];

  if (user?.role === 'client') {
    menuItems.splice(2, 0, { name: 'My Projects', icon: <Folder size={20} /> });
  } else if (user?.role === 'freelancer') {
    menuItems.splice(2, 0, { name: 'My Applications', icon: <Folder size={20} /> });
  }

  return (
    <div className="relative h-screen ">
      <button
        onClick={toggleSidebar}
        className="absolute z-10 p-2 transition-all duration-200 bg-white rounded-full shadow-md top-4 left-4 hover:shadow-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className={`transition-all duration-300 h-full bg-white border shadow-xl rounded-r-2xl ${isOpen ? 'w-60' : 'w-16'}`}>
        <div className="flex flex-col h-full p-4">
          <h1
            className={`cursor-pointer text-md font-Montserrat mb-6 mt-10 ${isOpen ? 'pl-6' : 'pl-1'}`}
            onClick={() => navigate(userRoutes.HOME)}
          >
            {isOpen ? '➔ home' : '➔'}
          </h1>

          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map((item, index) => {
                const isActive = currentPage === item.name;
                return (
                  <li key={index}>
                    <a
                      onClick={() => navigate(`/${item.name.toLowerCase().replace(/\s+/g, '')}`)}
                      className={`group flex items-center h-12 transition-all duration-200 font-Montserrat cursor-pointer 
                        ${isOpen 
                          ? isActive
                            ? 'bg-[#126d52] text-white rounded-xl px-3'
                            : 'text-gray-700 hover:text-[#126d52] hover:font-semibold hover:shadow-md rounded-xl px-3'
                          : 'justify-center'}
                      `}
                    >
                      <span className={`
                        flex items-center justify-center 
                        ${isOpen ? 'mr-3' : ''} 
                        ${isActive && !isOpen ? 'bg-[#126d52] text-white rounded-full h-10 w-10' : 'h-10 w-10'}
                      `}>
                        {item.icon}
                      </span>
                      {isOpen && <span>{item.name}</span>}
                    </a>

                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="pt-3 mt-auto border-t border-gray-200">
            <a
              href="#"
              className={`flex items-center transition-all duration-200 rounded-xl font-Montserrat cursor-pointer
                ${isOpen
                  ? 'p-3 text-gray-700 hover:bg-gray-100'
                  : 'justify-center p-3 text-gray-700 hover:bg-gray-100 rounded-full'}`}
            >
              <span className={isOpen ? 'mr-2' : ''}><LogOut size={20} /></span>
              {isOpen && <span>Logout</span>}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;