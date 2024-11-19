import React from "react";

const WhyUseCarbonCredits = () => {
  return (
    <div className="container text-left mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Why Use Carbon Credits?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Side: Data */}
        <div className="bg-gray-900 text-white  rounded-lg shadow-lg flex flex-col p-2 justify-start">
          <h2 className="text-2xl font-semibold mb-4">
            Industrial Pollution Analysis
          </h2>
          <p>
            The industrial sector is one of the largest contributors to
            greenhouse gas emissions. In 2023 alone, industries accounted for
            approximately 33% of global emissions. Carbon credits provide a
            market-based mechanism to incentivize reductions in emissions.
          </p>
          <p className="mt-3">
            By participating in carbon credit programs, companies can offset
            their carbon footprint, invest in sustainable practices, and
            contribute to environmental conservation efforts. This not only
            helps mitigate climate change but also promotes corporate social
            responsibility.
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="relative">
          <img
            src="pollution.png"
            alt="Industrial Pollution"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Left Image */}
        <div className="relative flex justify-center items-center">
          <img
            src="treeplant.png"
            alt="Benefits of Carbon Credits"
            className="w-auto h-[400px] rounded-lg shadow-lg"
          />
        </div>

        {/* Right Side: Data */}
        <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg flex flex-col justify-start">
          <h2 className="text-2xl font-semibold mb-6">
            Benefits of Carbon Credits
          </h2>
          <p>
            Carbon credits play a crucial role in the fight against climate
            change. By investing in carbon offset projects, industries can:
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>Reduce their carbon footprint.</li>
            <li>Support renewable energy initiatives.</li>
            <li>Contribute to reforestation and conservation efforts.</li>
            <li>Enhance their brand image through sustainable practices.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WhyUseCarbonCredits;
