import React, { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import contractabi from "../../utils/contractabi";

const TransferCreditsComp = ({ setreq }) => {
  const [formdata, setformdata] = useState({ recipient: "", amount: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const contractAddress = "0x7B0D279c6eFafa385209F4CC83210F2264A30bdF";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    if (!window.ethereum) {
      setError(
        "MetaMask is not installed. Please install MetaMask to proceed."
      );
      return;
    }

    if (!formdata.recipient || !formdata.amount) {
      setError("Please enter all required fields.");
      return;
    }

    if (parseFloat(formdata.amount) <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }

    setLoading(true);

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractabi, signer);

      // Initiate the transfer
      const transaction = await contract.transferBalance(
        formdata.amount,
        formdata.recipient
      );
      await transaction.wait(); // Wait for transaction confirmation

      alert("Transfer successful!");
      setreq(""); // Close the modal on success
    } catch (error) {
      // Handle specific error cases
      if (error.code === 4001) {
        setError("Transaction rejected by user.");
      } else if (error.message.includes("invalid address")) {
        setError("Recipient address is invalid.");
      } else {
        setError("An error occurred during the transaction. Please try again.");
      }
      console.error("Transfer error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full fixed top-0 bg-slate-800 min-h-screen flex flex-col justify-center items-center">
      <div className="w-full flex justify-center items-center">
        <button
          onClick={() => setreq("")}
          className="bg-green-600 font-bold p-2 mb-1 text-black rounded"
        >
          Close
        </button>
      </div>
      <div className="bg-white p-6 text-left shadow-lg rounded-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Transfer CCT</h2>

        {/* Display error message if any */}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-2">Recipient Address</label>
            <input
              type="text"
              name="recipient"
              value={formdata.recipient}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="Enter recipient's wallet address"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Amount</label>
            <input
              type="number"
              name="amount"
              value={formdata.amount}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="Enter amount to transfer"
            />
          </div>

          <button
            type="submit"
            className={`w-full text-white py-2 rounded-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Transfer CCT"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransferCreditsComp;
