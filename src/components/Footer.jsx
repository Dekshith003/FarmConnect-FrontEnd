import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Leaf } from "lucide-react"; // Only keeping this for the logo as you previously used it
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div
                className="w-8 h-8 rounded-[12px] flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #228B22 0%, #43ea7c 100%)",
                }}
              >
                <Leaf className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-xl">FarmConnect</span>
            </div>
            <p className="text-white/70">
              Connecting farmers and buyers for a sustainable agricultural
              future.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-green-500">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-green-500">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-green-500">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-green-500">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-green-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-green-500">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-green-500">
                  Marketplace
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Help</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="hover:text-green-500">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-green-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-green-500">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-green-500">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          <details className="border-b border-white/10 pb-2">
            <summary className="text-lg font-semibold">Quick Links</summary>
            <ul className="mt-2 space-y-2 ml-4">
              <li>
                <Link to="/" className="hover:text-green-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-green-500">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-green-500">
                  Marketplace
                </Link>
              </li>
            </ul>
          </details>

          <details className="border-b border-white/10 pb-2">
            <summary className="text-lg font-semibold">Help</summary>
            <ul className="mt-2 space-y-2 ml-4">
              <li>
                <Link to="/faq" className="hover:text-green-500">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-green-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-green-500">
                  Contact Us
                </Link>
              </li>
            </ul>
          </details>

          <details className="border-b border-white/10 pb-2">
            <summary className="text-lg font-semibold">Legal</summary>
            <ul className="mt-2 space-y-2 ml-4">
              <li>
                <a href="#" className="hover:text-green-500">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </details>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">FarmConnect</span>
            </div>
            <div className="flex space-x-3">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
