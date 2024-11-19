import React, { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";
import { QRCodeCanvas } from "qrcode.react"; // Import QRCodeCanvas

const ShareAddressComp = ({ setreq }) => {
  const [address, setAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  // Function to connect to MetaMask and get the user's address
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        setAddress(userAddress);
        setIsConnected(true);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask not installed. Please install it to use this feature.");
    }
  };

  useEffect(() => {
    connectMetaMask(); // Auto-connect on load
  }, []);

  const shareText = encodeURIComponent(`Here is my address: ${address}`);
  const whatsappShareLink = `https://wa.me/?text=${shareText}`;
  const emailShareLink = `mailto:?subject=My Address&body=${shareText}`;

  return (
    <div className="w-full fixed top-0 bg-slate-800 min-h-screen flex flex-col justify-center items-center">
      <div className="w-full flex justify-center items-center">
        <button
          onClick={() => {
            setIsConnected(false);
            setreq("");
          }}
          className="bg-green-600 font-bold p-2 mb-1 text-black rounded"
        >
          Close
        </button>
      </div>
      <div className="bg-white p-6 text-center shadow-lg rounded-md w-96">
        {isConnected ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">
              Share Address
            </h2>
            <div className="flex justify-center mb-4">
              <QRCodeCanvas value={address} size={128} />{" "}
              {/* Updated QRCodeCanvas */}
            </div>
            <p className="text-lg mb-4">Scan or share the address:</p>
            <p className="text-sm text-gray-700 mb-4">{address}</p>
            <div className="flex space-x-4 justify-center">
              <a
                href={whatsappShareLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
              >
                Share on WhatsApp
              </a>
              <a
                href={emailShareLink}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
              >
                Share via Email
              </a>
            </div>
          </>
        ) : (
          <button
            onClick={connectMetaMask}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          >
            Connect to MetaMask
          </button>
        )}
      </div>
    </div>
  );
};

export default ShareAddressComp;
