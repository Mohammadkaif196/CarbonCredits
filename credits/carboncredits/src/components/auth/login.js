import React, { useState, useEffect, useContext } from "react";
import { BrowserProvider, Contract } from "ethers";
import { useNavigate } from "react-router-dom";
import contractabi from "../../utils/contractabi";
import { LoginContext } from "../../utils/logincontext";

const Login = () => {
  const { logging } = useContext(LoginContext);
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const contractAddress = "0x7B0D279c6eFafa385209F4CC83210F2264A30bdF";
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initializeContract = async () => {
      if (window.ethereum) {
        try {
          const provider = new BrowserProvider(window.ethereum);
          // Request the user's accounts
          const accounts = await provider.send("eth_requestAccounts", []);
          if (accounts.length > 0) {
            setAccount(accounts[0]); // Automatically set the first account
            const signer = await provider.getSigner();
            const contractInstance = new Contract(
              contractAddress,
              contractabi,
              signer
            );
            setContract(contractInstance);
            setStatus("Wallet connected");
          } else {
            alert("Please connect to MetaMask!");
          }
        } catch (error) {
          console.error("Failed to initialize contract:", error);
        }
      } else {
        alert("Please install MetaMask!");
      }
    };
    initializeContract();
  }, [contractAddress]);

  const login = async () => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      setLoading(true);
      if (contract) {
        const tx = await contract.login();
        const userdetails = {
          name: tx[0],
          role: Number(tx[1]),
          nfthash: tx[2],
        };

        const response = await fetch("http://localhost:4000/sessioncreation", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userdetails),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          const result = await logging();
          if (result) {
            setStatus(`Login successful. Session created: ${data.message}`);
          }
        } else {
          setStatus("Failed to create session on backend");
        }
      } else {
        setStatus("Contract not initialized");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setStatus("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center text-white p-6 border border-zinc-200 rounded-lg shadow-2xl max-w-sm mx-auto">
        <h2 className="text-2xl font-bold mb-4">Login to CarbonCredits</h2>

        {account ? (
          <p className="mb-4">
            <strong>Connected account:</strong> {account}
          </p>
        ) : (
          <p className="mb-4 text-yellow-300">Connecting to wallet...</p>
        )}

        <button
          onClick={login}
          disabled={!account || loading}
          className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {status && <p className="mt-4 text-yellow-300">{status}</p>}
      </div>
      <div>
        Don't have an account?
        <b
          onClick={() => navigate("/signup")}
          className="text-orange-500 underline cursor-pointer"
        >
          Signup
        </b>
      </div>
    </div>
  );
};

export default Login;
