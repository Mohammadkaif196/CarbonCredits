import React from "react";
import { useNavigate } from "react-router-dom";
const Guidelines=()=>{
const instructions=[
    "Sign up using your email address to create an account on the platform. This will enable you to access your personal dashboard where you can view and manage your carbon credits.",
    "To interact with the blockchain, connect a cryptocurrency wallet such as MetaMask. This wallet will store your carbon credits, and you can use it to make transactions securely.",
    "On your dashboard, you can easily check your balance of carbon credits, including the amount you have acquired, transferred, or redeemed. You can also view your complete transaction history.",
    "You can purchase carbon credits by connecting your wallet and choosing the amount you wish to buy. Payments are made through cryptocurrencies like Ether or other supported tokens. This purchase will be recorded on the blockchain for transparency",
    "You can transfer carbon credits to other users by entering their wallet address and specifying the amount of credits to send. Ensure the wallet address is correct before confirming the transaction. All transfers will be securely recorded on the blockchain.",
    "Once you have carbon credits, you may redeem them for environmental projects or offset your carbon emissions, depending on the platform’s offerings. Each redemption is tracked for transparency and proof of your environmental contribution.",
    "Every transaction (purchase, transfer, or redemption) is securely logged on the blockchain, ensuring transparency and immutability. You can view transaction details at any time on your dashboard.",
    "Regularly check for platform updates, including new features, changes in carbon credit prices, or updates to terms and conditions. Notifications will be sent to your email or app to keep you informed of important developments.",
    "When purchasing or transferring credits, ensure that they are verified by the platform to confirm authenticity and compliance with environmental standards. Each carbon credit is backed by real-world verified projects to ensure it represents actual environmental impact.",
    "Depending on your location, carbon credits may be subject to taxes. It’s important to keep track of your purchases and redemptions for reporting purposes. Consult a tax professional for guidance on carbon credit taxation in your region.",
    "If you encounter any issues or have questions, contact customer support through the platform’s helpdesk or community forum. User feedback is essential for improving the platform’s services and user experience."
]

const navigate=useNavigate();
     return(
        <div className="flex flex-col items-center min-h-screen bg-slate-800 p-6">
      <div className="p-8 bg-slate-800 rounded-lg shadow-lg text-center  w-full">
        <h1 className="text-2xl font-bold mb-6 text-orange-800">
          Instructions
        </h1>
        <ol className="space-y-4 text-left">
       
          {instructions.map((instruction, index) => (
            <li
            key={index}
            className="p-4 bg-slate-900 rounded-lg text-white shadow-sm flex items-start space-x-4 transition-all duration-300 ease-in-out hover:outline hover:outline-4 hover:outline-orange-500"
          >
             <span className="text-orange-500 text-xl mr-4">➔</span>
              <span className="font-semibold">{instruction}</span> 
            </li>
          ))}
        </ol>

        <button className="p-2 rounded bg-red-500 text-white mt-3" onClick={()=>navigate(-1)}>Back</button>
      </div>
    </div>
     )
};
export default Guidelines;