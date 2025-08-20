import { useState, useEffect } from "react";
import { Button } from "../../components/user/button"
import HomeImage_1 from '../../assets/user/freelancer-home.svg'
import HomeImage_2 from '../../assets/user/freelancer-home2.svg'
import Modal_left_side from '../../assets/user/modal_left.avif'
import Modal_right_side from '../../assets/user/modal_right.avif'
import { useNavigate } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaintbrush,
  faComputer,
  faReceipt,
  faImage,
  faPanorama,
  faPenNib,
  faBullhorn,
  // faChartLine,
  faBriefcase,
  faChalkboardTeacher,
  faMusic,
  // faMicrophone,
  faGamepad,
  faRobot,
  // faBrain,
  faChartBar,
  // faDatabase,
  faHeadset,
  // faUserClock,
  faComments,
  // faPhoneVolume,
  faHeartbeat,
  // faSpa,
  faCheck,
  faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";

import { userRoutes } from "../../constants/routeUrl";
import Navbar from "../../components/user/navbar";
import { assignRole, fetchUserData } from "../../api/user";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/storage";
import Footer from "../../components/user/footer";
import Chatbot from "../../components/user/chatbot";
import HowItWorks from "../../components/user/home-hiw";
import Testimonials from "../../components/user/home-t";
import PlatformStats from "../../components/user/home-ps";

const Home = () => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user);
  
  const [role, setRole] = useState('');
  const [leftSelected, setLeftSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rightSelected, setRightSelected] = useState(false);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  // const [displayedTitle, setDisplayedTitle] = useState("");
  // const [displayedDescription, setDisplayedDescription] = useState("");
  
  const isNextEnabled = leftSelected || rightSelected;
  
  // const titleText = "Find the Right Talent,\nGet the Job Done.";
  // const descriptionText =
  //   "All-in-one platform to connect businesses with top freelancers for \nprojects, collaboration.";


  // useEffect(() => {
  //   let titleIndex = 0;
  //   const titleInterval = setInterval(() => {
  //     setDisplayedTitle((prev) => prev + titleText[titleIndex]);
  //     titleIndex++;
  //     if (titleIndex === titleText.length) {
  //       clearInterval(titleInterval);
  //       startDescriptionTyping();
  //     }
  //   }, 90); // speed of typing (ms)

  //   const startDescriptionTyping = () => {
  //     let descIndex = 0;
  //     const descInterval = setInterval(() => {
  //       setDisplayedDescription((prev) => prev + descriptionText[descIndex]);
  //       descIndex++;
  //       if (descIndex === descriptionText.length) {
  //         clearInterval(descInterval);
  //       }
  //     }, 90); // speed of typing (ms)
  //   };
  // }, []);
  
  useEffect(() => {    
    if (user.role == 'none') {
      setShowModal(true);
    }
    
    if(user && user.subscription == 'none') {
      const fetchUser = async() => {
         try {
            const response = await fetchUserData()
            if(response.success){              
               dispatch(setUser({subscription: response.data.user.subscriptionType}))
            }
         } catch (error) {
            console.error(error)
         }
      }
      fetchUser()
    }
  }, []);
  
  const handleLeftClick = () => {
    setLeftSelected(true);
    setRightSelected(false);
    setRole("freelancer");
  };
  
  const handleRightClick = () => {
    setRightSelected(true);
    setLeftSelected(false);
    setRole("client");
  };
  
  const HandleAssignRole = async () => {
    setLoading(true);
    try {
      const response = await assignRole(role, user.email);
      if (response.success) {
        setShowModal(false)
        dispatch(setUser({role}))
      } else {
        console.log('handle assign role response is something wrong');
      }
    } catch (error) {
      console.error("Error assigning role", error);
    } finally {
      setLoading(false);
    }
  };
  
  const categoryData = [
    { icon: faPaintbrush, title: "Graphic & Design" },
    { icon: faComputer, title: "Programming & Tech" },
    { icon: faReceipt, title: "Finance & Accounting" },
    { icon: faImage, title: "Photography & Editing" },
    { icon: faPanorama, title: "Video & Animation" },
    { icon: faPenNib, title: "Writing & Translation" },
    { icon: faBullhorn, title: "Marketing & Sales" },
    { icon: faBriefcase, title: "Business & Consulting" },
    { icon: faChalkboardTeacher, title: "Education & Training" },
    { icon: faMusic, title: "Music & Audio" },
    { icon: faGamepad, title: "Game Development" },
    { icon: faRobot, title: "AI & Machine Learning" },
    { icon: faChartBar, title: "Data Science & Analytics" },
    { icon: faHeadset, title: "Virtual Assistance" },
    { icon: faComments, title: "Customer Support" },
    { icon: faHeartbeat, title: "Personal & Lifestyle" },
  ];  
  
  return (
    <>
      <Chatbot/>
      <div className="">
        <Navbar currentPage="home" />     
        <div className="w-full h-[800px] bg-[#D7FEC8] top-0 pt-20">
          <div className="flex mt-4">
            <div className="flex items-center justify-start mt-8 pl-[12%]">
              <div className="flex flex-col">
                <h1 className="justify-center text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl font-Inter">
                  Find the Right Talent,
                  <br/> 
                  Get the Job Done.
                </h1>

                <p className="mt-5 text-sm sm:text-md md:text-lg lg:text-xl ">
                  All-in-one platform to connect businesses with top freelancers for <br />
                  projects, collaboration.
                </p>

                <Button
                  type="submit"
                  className="w-2/5 text-xl h-[68px] mt-12 rounded-2xl font-normal"
                  onClick={()=> user.email? navigate(userRoutes.PROJECTS) : navigate(userRoutes.SIGNIN)}
                  >
                  {user.email? 'Explore projects' : 'Get Started'}
                </Button>
              </div>
            </div>

            <div className="flex justify-end pl-[13%]">
              <div className="relative">
                <img
                  src={HomeImage_1}
                  alt="Home image"
                  className="relative mt-[5%] w-[600px] h-[600px] object-contain"
                />
              </div>
            </div>
          </div>
          
          <div className="relative py-16">
            <svg
              className="w-full h-20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 H1200 V60 
                  Q1050,20 900,60 
                  T600,60 T300,60 T0,60 Z"
                className="fill-[#D7FEC8]"
              ></path>
              
              <path
                d="M0,0 H1200 V80 
                  Q1050,40 900,80 
                  T600,80 T300,80 T0,80 Z"
                opacity=".7"
                className="fill-[#D7FEC8]"
              ></path>

              <path
                d="M0,0 H1200 V100 
                  Q1050,60 900,100 
                  T600,100 T300,100 T0,100 Z"
                opacity=".4"
                className="fill-[#D7FEC8]"
              ></path>
            </svg>
          </div>
        </div>

        <div className="py-32">
          <div className="relative w-full mx-auto overflow-hidden">
            
            {/* Top Wave */}
            <div className="relative">
              <svg
                className="w-full h-20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,120 V60 C80,30 200,20 320,35 
                    C480,55 600,100 760,80 
                    C900,60 1050,10 1200,40 V120 Z"
                  opacity=".25"
                  className="fill-[#1a5c4a]"
                ></path>

                <path
                  d="M0,120 V70 C100,40 250,20 400,45 
                    C600,80 750,40 900,50 
                    C1050,60 1150,20 1200,30 V120 Z"
                  opacity=".5"
                  className="fill-[#1a5c4a]"
                ></path>

                <path
                  d="M0,120 V80 C150,50 300,40 500,65 
                    C700,90 900,60 1200,80 V120 Z"
                  className="fill-[#1a5c4a]"
                ></path>
              </svg>
            </div>

            {/* Main Content */}
            <div className="bg-[#1a5c4a] p-8 min-h-[200px] relative">
            
              <div className="flex flex-col w-full pl-[7%] mb-10 ">
                <h1 className="justify-center text-5xl font-medium text-white font-playfair">
                  Top Service Categories
                </h1>
                <p className="pl-2 mt-3 text-lg text-white">
                  Explore the most popular service categories
                </p>
              </div>  
            
              <div className="absolute left-0 top-0 h-full w-[10%] bg-gradient-to-r from-[#1a5c4a] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 h-full w-[10%] bg-gradient-to-l from-[#1a5c4a] to-transparent z-10 pointer-events-none" />
              
              <div className="flex animate-scrollRight gap-6 w-max hover:[animation-play-state:paused]">
                {[...categoryData, ...categoryData].map((cat, i) => (
                  <div key={i} className="p-6 rounded-xl flex flex-col bg-[#2a6b54] hover:bg-[#a8d5ba] hover:text-[#1a5c4a] transition-all duration-300 min-w-[220px] max-w-[220px] group">
                    <FontAwesomeIcon 
                      icon={cat.icon} 
                      className="self-start pl-4 mt-2 mb-4 text-3xl text-white group-hover:text-[#1a5c4a] transition-colors duration-300" 
                    />
                    <div className="mt-4 text-xl font-medium text-left pl-2.5 tracking-wide text-white group-hover:text-[#1a5c4a] transition-colors duration-300">
                      {cat.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Wave */}
            <div className="relative">
              <svg
                className="w-full h-20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0 V20 C150,60 350,100 600,85 
                    C850,70 1050,30 1200,50 V0 Z"
                  className="fill-[#1a5c4a]"
                ></path>

                <path
                  d="M0,0 V35 C200,75 500,110 800,90 
                    C1000,70 1150,40 1200,60 V0 Z"
                  opacity=".5"
                  className="fill-[#1a5c4a]"
                ></path>

                <path
                  d="M0,0 V50 C100,90 400,120 700,100 
                    C950,80 1100,40 1200,70 V0 Z"
                  opacity=".25"
                  className="fill-[#1a5c4a]"
                ></path>
              </svg>
            </div>

          </div>
        </div>
        
        <div className="mt-24">
          <HowItWorks />
        </div>
        <div className="mt-24">
          <Testimonials/>
        </div>
        <div className="mt-24">
          <PlatformStats/>
        </div>
        
        <div className="w-full bg-gradient-to-b from-white via-[#e3ffe3] to-white">
          <div className="flex mt-24">
            <div className="flex justify-end pl-[18%]">
              <div className="relative">
                <img
                  src={HomeImage_2}
                  alt="Home image"
                  className="relative mt-[5%] w-[500px] h-[500px] object-contain"
                />
              </div>
            </div>
              
            <div className="flex items-center justify-start pl-[14%]">
              <div className="flex flex-col">
                <h1 className="justify-center text-2xl font-lighter sm:text-3xl md:text-4xl lg:text-5xl font-Inter text-[#0a5f45]">
                  Work Your Way
                </h1>

                <p className="mt-3 ml-1 text-sm text-gray-600 sm:text-md md:text-lg lg:text-xl">
                  You bring the skill. We'll make earning easy.
                </p>
                
                <div className="mt-8">
                  <div className="flex">
                    <FontAwesomeIcon icon={faCheck} className="self-start pl-1 mt-1 text-2xl text-green-600"/>
                    <p className="ml-4 text-sm tracking-wide sm:text-md md:text-lg lg:text-xl">Save your budget</p>
                  </div>
                  
                  <div className="flex mt-3">
                    <FontAwesomeIcon icon={faCheck} className="self-start pl-1 mt-1 text-2xl text-green-600"/>
                    <p className="ml-4 text-sm tracking-wide sm:text-md md:text-lg lg:text-xl">Completed work quickly</p>
                  </div>
                  
                  <div className="flex mt-3">
                    <FontAwesomeIcon icon={faCheck} className="self-start pl-1 mt-1 text-2xl text-green-600"/>
                    <p className="ml-4 text-sm tracking-wide sm:text-md md:text-lg lg:text-xl">Safe and secure</p>
                  </div>
                  
                  <div className="flex mt-3">
                    <FontAwesomeIcon icon={faCheck} className="self-start pl-1 mt-1 text-2xl text-green-600"/>
                    <p className="ml-4 text-sm tracking-wide sm:text-md md:text-lg lg:text-xl">24/7 support</p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>

      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
  
        <div className="relative flex flex-col w-full max-w-5xl h-[70vh] overflow-y-auto gap-4 p-8 mx-4 transition-all duration-500 ease-out transform bg-white rounded-lg animate-slideIn">
          {/* <div className="relative flex flex-col w-full max-w-5xl gap-4 p-8 mx-4 transition-all duration-500 ease-out transform bg-white rounded-lg animate-slideIn"> */}
            <h1 className="mt-4 text-[1.75rem] font-bold text-center">
              {user.name}, your account has been created!<br />
              What brings you to Crevio?
            </h1>
            <h1 className="mb-4 font-medium text-center text-gray-500 text-md">
              We want to tailor your experience so you'll feel right at home.
            </h1>
    
            <div className="flex flex-col gap-4 mt-4 mb-12 sm:flex-row">
              
              <div
                onClick={handleLeftClick}
                className={`group flex-1 p-4 relative cursor-pointer border rounded-lg border-gray-200 ${
                  leftSelected ? "border-gray-300 shadow-xl" : "hover:border-gray-300 hover:shadow-xl"
                }`}
              >
                <input
                  type="checkbox"
                  readOnly
                  className="absolute w-6 h-6 top-2 right-2 accent-black"
                  checked={leftSelected}
                />

                <img
                  src={Modal_left_side}
                  alt="left side"
                  className={`w-[64%] pt-10 transition-all duration-300 ease-out transform ${
                    leftSelected ? "-translate-y-3" : "group-hover:-translate-y-3"
                  }`}
                />

                <h2
                  className={`text-xl font-semibold transition-all duration-300 ease-out transform ${
                    leftSelected ? "-translate-y-2" : "group-hover:-translate-y-2"
                  }`}
                >
                  Selling freelance services
                </h2>

                <p
                  className={`text-gray-500 transition-all duration-300 ease-out delay-150 transform ${
                    leftSelected
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                  }`}
                >
                  I'd like to offer my services.
                </p>
              </div>

              <div
                onClick={handleRightClick}
                className={`group flex-1 p-4 relative cursor-pointer border rounded-lg border-gray-200 ${
                  rightSelected ? "border-gray-300 shadow-xl" : "hover:border-gray-300 hover:shadow-xl"
                }`}
              >
                <input
                  type="checkbox"
                  readOnly
                  className="absolute w-6 h-6 top-2 right-2 accent-black"
                  checked={rightSelected}
                />

                <img
                  src={Modal_right_side}
                  alt="left side"
                  className={`w-[77%] pt-10 transition-all duration-300 ease-out transform ${
                    rightSelected ? "-translate-y-3" : "group-hover:-translate-y-3"
                  }`}
                />

                <h2
                  className={`text-xl font-semibold transition-all duration-300 ease-out transform ${
                    rightSelected ? "-translate-y-2" : "group-hover:-translate-y-2"
                  }`}
                >
                  Buying freelance services
                </h2>

                <p
                  className={`text-gray-500 transition-all duration-300 ease-out delay-150 transform ${
                    rightSelected
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                  }`}
                >
                  I'm looking for talented people to work with.
                </p>
              </div>
              
            </div>
    
            <div className="flex justify-between">
              <div className="flex items-center gap-2 px-3 py-0 text-sm leading-tight text-yellow-600 rounded-md w-fit">
                <FontAwesomeIcon icon={faTriangleExclamation} className="text-yellow-400" />
                <span><i>Your role cannot be changed later. Please choose carefully.</i></span>
              </div>
            
              <button
                className={`px-6 py-2 bg-black text-white rounded hover:bg-slate-900 ${
                  !isNextEnabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!isNextEnabled || loading}
                onClick={HandleAssignRole}
              >
                {loading? (<div className="w-4 h-4 border-2 border-gray-300 rounded-full border-t-black animate-spin"></div>): ('Next')}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="pt-56">
        <Footer />
      </div>
    </>
  );
  
}

export default Home