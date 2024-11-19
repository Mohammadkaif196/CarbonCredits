import React from "react";
import { useNavigate } from "react-router-dom";
const Marketplace=()=>{
    const navigate=useNavigate();
    return(
        <div className="">
        <div className="p-8 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-semibold text-orange-800 mb-4">Page Under Construction</h1>
          <p className="text-orange-600">We are working hard to bring this page for trading. Stay tuned!</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-blue-800 text-white px-4 py-2 rounded hover:bg-orange-600"
        >Back</button>
      </div>
    )
}
export default Marketplace;