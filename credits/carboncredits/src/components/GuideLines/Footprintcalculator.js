import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

// Register chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FootprintCalculator = () => {
  const navigate = useNavigate();
  
  // State variables for each category
  const [carDistance, setCarDistance] = useState();
  const [fuelEfficiency, setFuelEfficiency] = useState();
  const [emissionFactorCar, setEmissionFactorCar] = useState();
  
  const [annualElectricityUsage, setAnnualElectricityUsage] = useState();
  const [emissionFactorElectricity, setEmissionFactorElectricity] = useState();
  
  const [dietType, setDietType] = useState('vegetarian');
  
  const [section, setSection] = useState('transportation');

  // Emissions calculations
  const carEmissions = (carDistance / fuelEfficiency) * emissionFactorCar;
  const electricityEmissions = annualElectricityUsage * emissionFactorElectricity;
  const dietaryEmissions = dietType === 'vegetarian' ? 1.5 : 2.0; 
  
  const totalCarbonFootprint = carEmissions + electricityEmissions + dietaryEmissions;

  // Bar chart data
  const data = {
    labels: ['Car', 'Electricity', 'Diet'],
    datasets: [
      {
        label: 'Carbon Footprint Contribution (%)',
        data: [
          (carEmissions / totalCarbonFootprint) * 100,
          (electricityEmissions / totalCarbonFootprint) * 100,
          (dietaryEmissions / totalCarbonFootprint) * 100,
        ],
        backgroundColor: ['#FF5733', '#3357FF', '#F6FF33'],
        borderColor: '#000',
        borderWidth: 1,
      },
    ],
  };

  // Reset function to clear all inputs
  const resetForm = () => {
    setCarDistance(0);
    setFuelEfficiency(0);
    setEmissionFactorCar(0);
    setAnnualElectricityUsage(0);
    setEmissionFactorElectricity(0);
    setDietType('vegetarian');
    setSection('transportation');
  };

  return (
    <div className="bg-slate-700 p-6 rounded-lg w-full max-w-lg mx-auto" style={{ minHeight: '600px' }}>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-white">Carbon Footprint Calculator</h1>
        <button className="bg-red-500 text-white text-lg font-bold py-2 px-4 rounded-lg hover:bg-red-600" onClick={() => navigate(-1)}>
          X
        </button>
      </div>

      {/* Display Current Section */}
      <div className="mt-6">
        {section === 'transportation' && (
          <div>
            <h2 className="font-bold text-xl text-white">Transportation</h2>
            <div className="bg-gray-800 p-4 rounded-lg mt-4">
              <label className="text-white">Car Emissions (kg CO₂):</label>
              <input
                type="number"
                value={carDistance}
                onChange={(e) => setCarDistance(e.target.value)}
                placeholder="Distance (km)"
                className="p-2 mt-2 rounded w-full"
              />
              <input
                type="number"
                value={fuelEfficiency}
                onChange={(e) => setFuelEfficiency(e.target.value)}
                placeholder="Fuel Efficiency (km/l)"
                className="p-2 mt-2 rounded w-full"
              />
              <input
                type="number"
                value={emissionFactorCar}
                onChange={(e) => setEmissionFactorCar(e.target.value)}
                placeholder="Emission Factor (kg CO₂/l)"
                className="p-2 mt-2 rounded w-full"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={() => setSection('homeEnergyUse')} className="p-2 rounded bg-blue-500 text-white">Next: Home Energy Use</button>
            </div>
          </div>
        )}

        {section === 'homeEnergyUse' && (
          <div>
            <h2 className="font-bold text-xl text-white">Home Energy Use</h2>
            <div className="bg-gray-800 p-4 rounded-lg mt-4">
              <label className="text-white">Electricity Emissions (kg CO₂):</label>
              <input
                type="number"
                value={annualElectricityUsage}
                onChange={(e) => setAnnualElectricityUsage(e.target.value)}
                placeholder="Annual Electricity Usage (kWh)"
                className="p-2 mt-2 rounded w-full"
              />
              <input
                type="number"
                value={emissionFactorElectricity}
                onChange={(e) => setEmissionFactorElectricity(e.target.value)}
                placeholder="Emission Factor (kg CO₂/kWh)"
                className="p-2 mt-2 rounded w-full"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={() => setSection('transportation')} className="p-2 rounded bg-gray-500 text-white">Back</button>
              <button onClick={() => setSection('foodConsumption')} className="p-2 rounded bg-blue-500 text-white">Next: Food Consumption</button>
            </div>
          </div>
        )}

        {section === 'foodConsumption' && (
          <div>
            <h2 className="font-bold text-xl text-white">Food Consumption</h2>
            <div className="bg-gray-800 p-4 rounded-lg mt-4">
              <label className="text-white">Dietary Emissions (t CO₂e):</label>
              <select
                value={dietType}
                onChange={(e) => setDietType(e.target.value)}
                className="p-2 mt-2 rounded w-full"
              >
                <option value="vegetarian">Vegetarian Diet (1.5 t CO₂e)</option>
                <option value="non-vegetarian">Non-Vegetarian Diet (2.0 t CO₂e)</option>
              </select>
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={() => setSection('homeEnergyUse')} className="p-2 rounded bg-gray-500 text-white">Back</button>
              <button onClick={() => setSection('result')} className="p-2 rounded bg-blue-500 text-white">Next: Calculate Total Footprint</button>
            </div>
          </div>
        )}

        {section === 'result' && (
          <div>
            <h2 className="font-bold text-xl text-white">Total Carbon Footprint</h2>
            <div className="bg-gray-800 p-4 rounded-lg mt-4">
              <p className="text-white">Your total carbon footprint is: {totalCarbonFootprint.toFixed(2)} kg CO₂</p>
            </div>
            <div className="mt-4">
              <Bar data={data} options={{ responsive: true }} />
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={() => setSection('foodConsumption')} className="p-2 rounded bg-gray-500 text-white">Back</button>
              <button onClick={resetForm} className="p-2 rounded bg-red-500 text-white">Reset</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FootprintCalculator;
