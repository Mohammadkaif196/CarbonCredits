import React, { useEffect, useState, useContext } from "react";
import { Nav } from "../../utils/Header";
import { LoginContext } from "../../utils/logincontext";
import { BrowserProvider, Contract } from "ethers";
import contractabi from "../../utils/contractabi";
import { useNavigate } from "react-router-dom";
import Marketplace from "../marketplace/Marketplace";


const Card = ({ name, setActiveSection }) => (
    <div
      onClick={() => setActiveSection(name)}
      className="bg-green-500 cursor-pointer flex items-center text-black font-semibold justify-center p-4 m-2 shadow-lg rounded"
    >
      <h1>{name}</h1>
    </div>
  );
//for navbar
const BuyerNav = ({ activeView, setActiveView }) => (
    <div className="bg-gray-800 text-white flex justify-center space-x-4 py-3">
      <button
        onClick={() => setActiveView("details")}
        className={`px-4 py-2 rounded ${
          activeView === "details" ? "bg-blue-500" : "bg-gray-600"
        }`}
      >
        Buyer Details
      </button>
      <button
        onClick={() => setActiveView("marketplace")}
        className={`px-4 py-2 rounded ${
          activeView === "marketplace" ? "bg-blue-500" : "bg-gray-600"
        }`}
      >
        Marketplace
      </button>
    </div>
  );
  //buyer details
  const BuyerDetails = () => {
    const [activeSection, setActiveSection] = useState("details");
    const { userDetails } = useContext(LoginContext);
    const navigate=useNavigate();

  return (
   
    <div className="bg-slate-800 shadow-lg rounded p-4 w-full h-[80vh]">
        <button
          className="mb-2 bg-red-800 text-white px-2 py-2 rounded hover:bg-orange-600 ml-[1300px]"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      <h2 className="text-2xl font-bold mb-4">Buyer Details</h2>
      {/* Content Section based on active button */}
      <div className="grid grid-cols-4 gap-4 bg-slate-700 rounded font-medium place-items-center p-4">
          {[
            "Buyer Details",
            "Balance Check",
            "Receive CCT",
            "Request CCT",
          ].map((item, index) => (
            <Card name={item} key={index} setActiveSection={setActiveSection} />
          ))}
        </div>
        
    </div>
  );
};

  function Buyer(){
    const [activeView, setActiveView] = useState("details");



    const contractAddress = "0x7B0D279c6eFafa385209F4CC83210F2264A30bdF";
  
  return(
    <div className="w-full h-[100vh] ">
    <header className="w-full h-[11vh] shadow-2xl flex flex-col justify-between p-1">
      <Nav />
    </header>
    <BuyerNav activeView={activeView} setActiveView={setActiveView} />

      {/* Conditional rendering based on selected view */}
      <main className="flex-1 p-4" >
        {activeView === "details" ? <BuyerDetails /> : <Marketplace />}
      </main>
    </div>
  )
}
  export default Buyer;

