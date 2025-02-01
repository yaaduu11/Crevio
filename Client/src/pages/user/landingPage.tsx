import { Button } from "../../components/user/button"
import HomeImage_1 from '../../assets/user/freelancer-home.svg'
import HomeImage_2 from '../../assets/user/freelancer-home2.svg'
import { useNavigate } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintbrush } from "@fortawesome/free-solid-svg-icons";
import { faComputer } from '@fortawesome/free-solid-svg-icons';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faPanorama } from '@fortawesome/free-solid-svg-icons';
import { faPenNib } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const LandingPage = () => {
  const navigate = useNavigate()
  
  return (
    <>
      <div className="">
        <div className="w-full h-[800px] bg-[#D7FEC8] rounded-br-[160px] shadow-md top-0">
          <h1 className="text-[#00835B] font-K2D text-5xl mb-2 font-semibold ml-8 ">
            Crevio
          </h1>

          <div className="flex">
            <div className="flex items-center justify-start mt-8 pl-[12%]">
              <div className="flex flex-col">
                <h1 className="justify-center text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl font-Inter">
                  Find the Right Talent,
                  <br />
                  Get the Job Done.
                </h1>

                <p className="mt-5 text-sm sm:text-md md:text-lg lg:text-xl ">
                  All-in-one platform to connect businesses with top freelancers for <br />
                  projects, collaboration.
                </p>

                <Button
                  type="submit"
                  className="w-2/5 text-xl h-[68px] mt-12 rounded-2xl font-normal"
                  onClick={() => navigate('/signin')}
                  >
                  Get Started
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
        </div>
        
        <div>
          <div className="flex flex-col w-full pl-[11%] mt-32">
            <h1 className="justify-center text-4xl font-medium font-Inter ">
              Top Service Categories
            </h1>
            <p className="mt-3 text-xl">
            Explore the most popular service categories
            </p>
          </div>  
          
          <div className="bg-[#EDF3FD] rounded-2xl w-4/5 mx-auto p-4 text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-[3%] items-center min-h-[300px] mt-6">
            <div className="p-4 bg-white rounded-xl flex flex-col border border-[#E5E7EB]">
              <FontAwesomeIcon icon={faPaintbrush} className="self-start pl-4 mt-2 mb-2 text-2xl text-black" />
              <div className="mt-4 text-xl font-medium text-left pl-2.5 tracking-wide">
                Graphic &<br /> Design
              </div>
              <p className="mt-1 text-left text-gray-400 text-md pl-2.5">3 services</p>
            </div>

            <div className="p-4 bg-white rounded-xl flex flex-col border border-[#E5E7EB]">
              <FontAwesomeIcon icon={faComputer} className="self-start pl-4 mt-2 mb-2 text-2xl text-black" />
              <div className="mt-4 text-xl font-medium text-left pl-2.5 tracking-wide">
                Programming &<br /> Tech
              </div>
              <p className="mt-1 text-left text-gray-400 text-md pl-2.5">3 services</p>
            </div>

            <div className="p-4 bg-white rounded-xl flex flex-col border border-[#E5E7EB]">
              <FontAwesomeIcon icon={faReceipt} className="self-start pl-4 mt-2 mb-2 text-2xl text-black" />
              <div className="mt-4 text-xl font-medium text-left pl-2.5 tracking-wide">
                Finance &<br /> Accounting
              </div>
              <p className="mt-1 text-left text-gray-400 text-md pl-2.5">3 services</p>
            </div>

            <div className="p-4 bg-white rounded-xl flex flex-col border border-[#E5E7EB]">
              <FontAwesomeIcon icon={faImage} className="self-start pl-4 mt-2 mb-2 text-2xl text-black" />
              <div className="mt-4 text-xl font-medium text-left pl-2.5 tracking-wide">
                Photography &<br /> Editing
              </div>
              <p className="mt-1 text-left text-gray-400 text-md pl-2.5">3 services</p>
            </div>

            <div className="p-4 bg-white rounded-xl flex flex-col border border-[#E5E7EB]">
              <FontAwesomeIcon icon={faPanorama} className="self-start pl-4 mt-2 mb-2 text-2xl text-black" />
              <div className="mt-4 text-xl font-medium text-left pl-2.5 tracking-wide">
                Video &<br /> Animation
              </div>
              <p className="mt-1 text-left text-gray-400 text-md pl-2.5">3 services</p>
            </div>

            <div className="p-4 bg-white rounded-xl flex flex-col border border-[#E5E7EB]">
              <FontAwesomeIcon icon={faPenNib} className="self-start pl-4 mt-2 mb-2 text-2xl text-black" />
              <div className="mt-4 text-xl font-medium text-left pl-2.5 tracking-wide">
                Writing &<br /> Translation
              </div>
              <p className="mt-1 text-left text-gray-400 text-md pl-2.5">3 services</p>
            </div>
          </div>
        </div>
        
        
        <div className="flex mt-52">
          <div className="flex justify-end pl-[15%]">
            <div className="relative">
              <img
                src={HomeImage_2}
                alt="Home image"
                className="relative mt-[5%] w-[600px] h-[600px] object-contain"
              />
            </div>
          </div>
            
          <div className="flex items-center justify-start pl-[14%]">
            <div className="flex flex-col">
              <h1 className="justify-center text-2xl font-lighter sm:text-3xl md:text-4xl lg:text-5xl font-Inter">
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
        
        
        <h1 className="mt-40">hello</h1>
      </div>
    </>
  );
  
}

export default LandingPage
