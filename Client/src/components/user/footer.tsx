import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { Plus } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-[#1a5c4a] text-white px-8 py-16 font-Montserrat">
      
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-32" 
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 V60 C80,90 200,100 320,85 
              C480,65 600,20 760,40 
              C900,60 1050,110 1200,80 V0 Z"
            opacity=".25"
            className="fill-white"
          ></path>

          <path
            d="M0,0 V50 C100,80 250,100 400,75 
              C600,40 750,80 900,70 
              C1050,60 1150,100 1200,90 V0 Z"
            opacity=".5"
            className="fill-white"
          ></path>

          <path
            d="M0,0 V40 C150,70 300,80 500,55 
              C700,30 900,60 1200,40 V0 Z"
            className="fill-white"
          ></path>
        </svg>
      </div>

      
      <div className="mx-auto max-w-7xl pt-28">
        <div className="grid grid-cols-1 gap-12 pt-8 mb-16 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-1">
            <div className="flex items-start space-x-4">
              <Plus className="flex-shrink-0 w-12 h-12 mt-2 text-white" strokeWidth={3} />
              <div>
                <h2 className="mb-6 text-4xl font-bold leading-tight lg:text-5xl">
                  Let's make it happen<br />
                  <span className="text-[#a8d5ba]">your projects</span>
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-gray-300">
                  Write to us now to start your project with complete confidence.
                </p>
                <button className="bg-[#a8d5ba] text-[#1a5c4a] px-8 py-3 rounded-full font-semibold hover:bg-[#92c7a3] transition-colors duration-300">
                  GET A QUOTE
                </button>
              </div>
            </div>

            <div className="pt-8 space-y-4">
              <h1 className="text-3xl font-semibold font-K2D">Crevio</h1>
              <div className="flex space-x-4 text-xl">
                <FontAwesomeIcon icon={faXTwitter} className="hover:text-[#a8d5ba] cursor-pointer transition-colors duration-300" />
                <FontAwesomeIcon icon={faLinkedin} className="hover:text-[#a8d5ba] cursor-pointer transition-colors duration-300" />
                <FontAwesomeIcon icon={faInstagram} className="hover:text-[#a8d5ba] cursor-pointer transition-colors duration-300" />
                <FontAwesomeIcon icon={faFacebook} className="hover:text-[#a8d5ba] cursor-pointer transition-colors duration-300" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:col-span-2 md:grid-cols-3 lg:gap-12">
            <div>
              <h3 className="mb-6 text-lg font-bold tracking-wider">ABOUT</h3>
              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-sm text-gray-300">About us</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-300">Career</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-300">Blogs</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-300">FAQ's</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-300">Contact us</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-bold tracking-wider">SERVICES</h3>
              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-sm text-gray-300">Services</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-300">Projects</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-300">Jobs</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-300">Freelancers</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-300">Employers</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-bold tracking-wider">SUPPORT</h3>
              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-sm text-gray-300">Privacy Policy</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-300">Terms of Use</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-300">Help Center</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-300">Updates</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-300">Documentation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#2a6b54] pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2025 Crevio. All Rights Reserved.</p>
          <p className="mt-2 md:mt-0">Production by CREVIO</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

{/* <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
  <svg 
    className="relative block w-full h-20" 
    data-name="Layer 1" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 1200 120" 
    preserveAspectRatio="none"
  >
    <path 
      d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
      opacity=".25" 
      className="fill-white"
    ></path>
    <path 
      d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
      opacity=".5" 
      className="fill-white"
    ></path>
    <path 
      d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
      className="fill-white"
    ></path>
  </svg>
</div> */}