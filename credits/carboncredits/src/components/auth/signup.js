import React from "react";
import { BrowserProvider, Contract } from "ethers";
import { useNavigate } from "react-router-dom";
import contractabi from "../../utils/contractabi";

function Signup() {
  const Navigate = useNavigate();
  const roleval = {
    None: 0,
    Supplier: 1,
    Auditor: 2,
    RegulatoryAuthority: 3,
    buyer: 4,
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const role = event.target.role.value;
    console.log(name, email, roleval[role]);
    if (typeof window.ethereum !== "undefined") {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contractAddress = "0x7B0D279c6eFafa385209F4CC83210F2264A30bdF";

      const contract = new Contract(contractAddress, contractabi, signer);

      try {
        const transactionResponse = await contract.signup(
          name,
          email,
          roleval[role]
        );
        console.log("Transaction Response:", transactionResponse);

        await transactionResponse.wait();
        console.log("Signup successful!");
      } catch (error) {
        console.error("Error during signup:", error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col  justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start items-start space-y-4 p-4 shadow-2xl border border-zinc-50 rounded-md w-96"
      >
        <h1 className="text-xl font-bold text-green-700">Register User</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="w-full p-2 border-2 border-green-500 rounded focus:outline-none focus:ring focus:ring-green-300"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-2 border-2 border-green-500 rounded focus:outline-none focus:ring focus:ring-green-300"
        />
        <select
          name="role"
          id="role"
          required
          className="w-full p-2 border-2 border-green-500 rounded font-medium text-green-800 bg-white focus:outline-none focus:ring focus:ring-green-300"
        >
          {["None", "Supplier", "Auditor", "RegulatoryAuthority", "buyer"].map(
            (Item, index) => (
              <option key={index} value={Item}>
                {Item}
              </option>
            )
          )}
        </select>

        <input
          value="Sign Up with MetaMask"
          type="submit"
          className="w-full p-2 bg-orange-500 text-white font-bold rounded cursor-pointer hover:bg-orange-600 transition"
        />
      </form>
      <div>
        Already have a account?
        <b
          onClick={() => {
            Navigate("/login");
          }}
          className="text-orange-500 underline cursor-pointer"
        >
          Login
        </b>
      </div>
    </div>
  );
}

export default Signup;
