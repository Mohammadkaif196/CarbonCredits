import { React, useContext, useEffect } from "react";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./logincontext";
import img from "./pngegg.png";
import mainlogo from "./mainlogo.png"
import Marketplace from "../components/marketplace/Marketplace";
import Guidelines from "../components/GuideLines/Guidelines";
import Footprintcalculator from "../components/GuideLines/Footprintcalculator";

const Nav = () => {
  const [time, setTime] = useState("");
  const { userDetails } = useContext(LoginContext);
  const username = userDetails ? userDetails.name : "Guest";

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString();
      setTime(currentTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-black shadow-xl flex justify-between h-full ">
      <div className="flex items-center">
        <div className="flex flex-col justify-start items-start">
          <img src={mainlogo} alt="Logo" className="h-12 object-contain" />
          <p className="text-sm text-white">Regulated by Government of India</p>
        </div>
      </div>
      <div className="w-fit gap-2 flex justify-between items-center bg-black text-white px-4">
        <h1>Hi Mr. {username}</h1>
        <h2>{time}</h2>
      </div>
    </div>
  );
};

export default Nav;
function Header() {
  const { logout, userDetails } = useContext(LoginContext);
  const navigate = useNavigate();

  const[showpop,setShowpop]=useState(false); // for popup 
  const handlenav = () => {
    alert(userDetails.role);
    if (userDetails?.role == 1) {
      navigate(`/supplier-dashboard/${userDetails?.nfthash}`);
    } else if (userDetails.role == 2) {
      navigate(`/auditor-dashboard/${userDetails?.nfthash}`);
    } else if (userDetails.role == 3) {
      navigate(`/regulator-dashboard/${userDetails?.nfthash}`);
    } else if (userDetails.role == 4) {
      navigate(`/buyer-dashboard/${userDetails?.nfthash}`);
    }
  };

  const handleplace=()=>{
    navigate("/marketplace");
  }
  //for guidelins page
  const handleGui=()=>{
    navigate("/Guidelines");
  }

  // for opening calculator

  const handleCal=()=>{
         setShowpop(true);
  }
  const handleClosecal=()=>{
    setShowpop(false);
  }

  return (
    <header className="w-[100vw] z-10 fixed top-0 bg-gray-800 p-1">
      <div className="flex justify-between items-center mb-4 mt-2">
        {/* Left Side: Logo and Tagline */}
        <div className="flex items-center">
          <div className="flex flex-col justify-start items-start">
            <img src={mainlogo} alt="Logo" className="h-14 object-contain" />
           
          </div>
        </div>

        {/* Right Side: Social Media Icons and Guidelines Button */}
        <div className="flex items-center">
          {/* Social Media Icons */}
          <div className="flex space-x-4 mr-4">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-white h-6 w-6 hover:text-pink-800" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-white h-6 w-6 hover:text-blue-500" />
            </a>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="text-white h-6 w-6 hover:text-green-500" />
            </a>
          </div>

          {/* Guidelines Button */}
          <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          onClick={()=>handleGui()}>
            Guidelines
          </button>
        </div>
      </div>
      <div className="w-full bg-black h-12 p-2 rounded  flex justify-between">
        <div className="flex justify-center font-bold items-center">
          <button
            className="hover:text-orange-600 mr-10"
            onClick={() => {
              handlenav();
            }}
          >
            Go to Dashboard
          </button>
          <button className="hover:text-orange-600"
          onClick={()=>{
            handleplace()
          }}> Market Place</button>
        </div>
        <div className="flex justify-center items-center font-bold">
          <button className=" mr-15 px-2 py-2 rounded hover:text-orange-500"
          onClick={()=>handleCal()}>calculator</button>
          {/* for calculator */}
          {showpop && (
            <div className="fixed inset-0 bg-slate-800 bg-opacity-95 flex justify-center items-center">
            {/* <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-2xl font-semibold mb-4">This is a Popup Window</h2>
              <p className="mb-4">
                You can add any content or functionality here. For example, a form, some instructions, etc.
              </p>
              <button className="mt-5 bg-blue-500 p-2 rounded" onClick={()=>handleClosecal()}>cancle</button>
              </div> */}
               <Footprintcalculator/>
              </div>
            // <div>
            //   <Footprintcalculator/>
            //   </div>

          )}
          <button
            onClick={() => {
              logout();
            }}
            className="hover:text-orange-500"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export { Header, Nav };
