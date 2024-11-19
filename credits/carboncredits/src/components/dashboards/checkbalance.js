import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract, formatEther } from "ethers";
import contractabi from "../../utils/contractabi";

const Checkbalance = ({ setreq, supplieraddress }) => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const contractAddress = "0x7B0D279c6eFafa385209F4CC83210F2264A30bdF";

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractabi, signer);

      const balance = await contract.getBalance();
      setBalance(Number(balance));
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [supplieraddress]);

  return (
    <div className="w-full fixed top-0 left-0 bg-black bg-opacity-50 h-full flex justify-center items-center">
      <div className="bg-white p-8 shadow-lg rounded-lg w-[400px] text-center relative">
        <button
          onClick={() => setreq("")}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Account Balance
        </h2>

        {loading ? (
          <p className="text-lg text-gray-500">Loading balance...</p>
        ) : balance !== null ? (
          <>
            <p className="text-lg font-semibold text-gray-700">
              Supplier Address:
            </p>
            <p className="mb-4 text-gray-600 break-words">{supplieraddress}</p>
            <p className="text-4xl font-bold text-green-500 mb-4">
              {balance} CCT
            </p>
          </>
        ) : (
          <p className="text-red-500">Error fetching balance. Try again.</p>
        )}

        <button
          onClick={fetchBalance}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Refresh Balance
        </button>
      </div>
    </div>
  );
};

export default Checkbalance;
