import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#dbffcf] to-white text-[#09573f] px-8 pt-20 pb-6 font-Montserrat rounded-t-[4rem]">
      <div className="grid grid-cols-1 gap-6 pb-8 border-b border-gray-300 md:grid-cols-5">
        <div>
          <h1 className="text-5xl font-K2D font-semibold text-[#00835B] mb-4">Crevio</h1>
          <div className="flex ml-2 space-x-4 text-xl">
            <FontAwesomeIcon icon={faXTwitter} className="hover:text-[#127a5b] cursor-pointer" />
            <FontAwesomeIcon icon={faLinkedin} className="hover:text-[#127a5b] cursor-pointer" />
            <FontAwesomeIcon icon={faInstagram} className="hover:text-[#127a5b] cursor-pointer" />
            <FontAwesomeIcon icon={faFacebook} className="hover:text-[#127a5b] cursor-pointer" />
          </div>
        </div>

        <div>
          <h2 className="mb-3 font-semibold">CATEGORIES</h2>
          <ul className="space-y-1 text-sm">
            <li>Writing & Translation</li>
            <li>Technology & Programming</li>
            <li>Transactional email</li>
            <li>Design</li>
            <li>Video, Photo & Image</li>
            <li>Digital Marketing</li>
            <li>Social Media</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 font-semibold">ABOUT</h2>
          <ul className="space-y-1 text-sm">
            <li>About us</li>
            <li>Career</li>
            <li>Blogs</li>
            <li>FAQ’s</li>
            <li>Contact us</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 font-semibold">SERVICES</h2>
          <ul className="space-y-1 text-sm">
            <li>Services</li>
            <li>Projects</li>
            <li>Jobs</li>
            <li>Freelancers</li>
            <li>Employers</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 font-semibold">SUPPORT</h2>
          <ul className="mb-4 space-y-1 text-sm">
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Help Center</li>
            <li>Updates</li>
            <li>Documentation</li>
          </ul>
        </div>
      </div>

      <div className="pt-3 text-sm text-center text-gray-700">
        © 2025 Crevio. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
