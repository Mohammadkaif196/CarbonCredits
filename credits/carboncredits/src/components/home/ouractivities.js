import React from "react";

const OurActivities = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Our Activities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Activity 1 */}
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Carbon Credit Trading</h2>
          <p>
            We facilitate a marketplace for buying and selling carbon credits,
            enabling businesses to offset their carbon emissions effectively.
          </p>
        </div>

        {/* Activity 2 */}
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Awareness Campaigns</h2>
          <p>
            Through workshops and educational materials, we raise awareness
            about the importance of carbon credits and sustainability practices.
          </p>
        </div>

        {/* Activity 3 */}
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Project Funding</h2>
          <p>
            We provide funding and support for projects that reduce greenhouse
            gas emissions, such as renewable energy initiatives and
            reforestation efforts.
          </p>
        </div>

        {/* Activity 4 */}
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Consultation Services</h2>
          <p>
            We offer consultation services to businesses looking to improve
            their sustainability practices and navigate the carbon credit
            market.
          </p>
        </div>

        {/* Activity 5 */}
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">
            Partnership Development
          </h2>
          <p>
            We foster partnerships with governments, NGOs, and private sectors
            to create a robust ecosystem for carbon credit utilization.
          </p>
        </div>

        {/* Activity 6 */}
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">
            Research and Development
          </h2>
          <p>
            We engage in research to develop innovative solutions and
            technologies that enhance carbon credit projects and sustainability
            efforts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurActivities;
