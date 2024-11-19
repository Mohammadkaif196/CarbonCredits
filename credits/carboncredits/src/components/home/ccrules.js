import React from "react";

const CarbonCreditsRules = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Must ones!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4 p-6">
        {/* Card 1: Suppliers */}
        <div className="bg-gray-800 h-[300px] text-white rounded-lg shadow-lg p-4 relative">
          <div className="absolute top-2 left-2 text-3xl">📌</div>
          <h2 className="text-xl font-bold mb-2">For Suppliers</h2>
          <ul className="text-left pt-10 list-inside">
            <li>Ensure accurate reporting of carbon credits generated.</li>
            <li>Submit reports timely for verification.</li>
            <li>Maintain transparency in project details.</li>
            <li>Comply with regulatory guidelines set by authorities.</li>
          </ul>
        </div>

        {/* Card 2: Buyers */}
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-4  relative">
          <div className="absolute top-2 left-2 text-3xl">📌</div>
          <h2 className="text-xl font-bold mb-2">For Buyers</h2>
          <ul className=" text-left pt-10 list-inside">
            <li>Verify the authenticity of carbon credits before purchase.</li>
            <li>Understand the impact of your purchases on the environment.</li>
            <li>Be aware of the pricing trends in the carbon credit market.</li>
            <li>
              Utilize credits responsibly and keep records of transactions.
            </li>
          </ul>
        </div>

        {/* Card 3: Helplines */}
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-4 relative">
          <div className="absolute top-2 left-2 text-3xl">📌</div>
          <h2 className="text-xl font-bold mb-2">Helplines</h2>
          <ul className="list-inside pt-10 text-left ">
            <li>For Supplier Queries: +91 12345 67890</li>
            <li>For Buyer Support: +91 98765 43210</li>
            <li>General Inquiries: +91 55555 55555</li>
            <li>Email: support@carboncredits.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarbonCreditsRules;
