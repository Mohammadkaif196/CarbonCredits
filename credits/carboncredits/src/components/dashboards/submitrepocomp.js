import React, { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import axios from "axios";
import contractabi from "../../utils/contractabi";
import { parseEther } from "ethers";
const contractAddress = "0x7B0D279c6eFafa385209F4CC83210F2264A30bdF";

const SubmittingrepoComp = ({ setreq }) => {
  const [formdata, setformdata] = useState({
    projectCompanyName: "",
    companyPhone: "",
    geographicLocation: "",
    reportIPFSLink: "",
    creditAmount: "",
    pdfFile: null,
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setformdata({ ...formdata, pdfFile: file });

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://localhost:4000/upload", {
          method: "POST",
          body: formData,
          headers: {},
        });

        if (response.ok) {
          const data = await response.json();
          setformdata((prev) => ({
            ...prev,
            reportIPFSLink: data?.url,
          }));
        } else {
          console.error("File upload failed:", response.statusText);
        }
      } catch (error) {
        console.error("File upload failed:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractabi, signer);

      if (!formdata.reportIPFSLink) {
        alert("Please upload a PDF file first.");
        return;
      }

      const transaction = await contract.submitReport(
        formdata.projectCompanyName,
        formdata.companyPhone,
        formdata.geographicLocation,
        formdata.reportIPFSLink,
        formdata.creditAmount,
        { value: parseEther("1") }
      );

      await transaction.wait();
      alert("Successfully submitted!");
      setreq("");
    } catch (error) {
      console.error("Transaction failed:", error);
      if (error.data) {
        console.error("Error data:", error.data);
      }
      alert(
        "Transaction failed: " + (error.message || "An unknown error occurred.")
      );
    }
  };

  return (
    <div className="fixed top-0 w-full min-h-screen bg-slate-800 flex flex-col justify-center items-center overflow-y-auto text-sm">
      <div className="w-full flex justify-center items-center mb-4">
        <button
          onClick={() => setreq("")}
          className="bg-green-600 font-bold p-2 text-black rounded shadow"
        >
          Close
        </button>
      </div>
      <div className="bg-white max-h-[90vh] overflow-auto shadow-lg rounded-lg p-8 w-full max-w-2xl border border-gray-300">
        <h1 className="text-xl font-semibold text-center mb-4">
          CCT Project Submission
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project & Company Name */}
          <div>
            <label className="block text-left text-gray-700 mb-1">
              Project & Company Name
            </label>
            <input
              type="text"
              name="projectCompanyName"
              value={formdata.projectCompanyName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter project & company name"
            />
          </div>

          {/* Company Phone Number */}
          <div>
            <label className="block text-left text-gray-700 mb-1">
              Company Phone Number
            </label>
            <input
              type="tel"
              name="companyPhone"
              value={formdata.companyPhone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter company phone number"
            />
          </div>

          {/* Geographic Location */}
          <div>
            <label className="block text-left text-gray-700 mb-1">
              Geographic Location
            </label>
            <input
              type="text"
              name="geographicLocation"
              value={formdata.geographicLocation}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter project location"
            />
          </div>

          {/* Report IPFS Link */}
          <div>
            <label className="block text-left text-gray-700 mb-1">
              Report IPFS Link
            </label>
            <input
              type="url"
              name="reportIPFSLink"
              value={formdata.reportIPFSLink}
              onChange={handleChange}
              required
              readOnly
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-100"
              placeholder="IPFS link will auto-fill after upload"
            />
          </div>

          {/* PDF File Upload */}
          <div>
            <label className="block text-left text-gray-700 mb-1">
              Upload PDF
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-gray-600">
              {formdata.pdfFile ? formdata.pdfFile.name : "No file chosen"}
            </p>
          </div>

          {/* Credit Amount */}
          <div>
            <label className="block text-left text-gray-700 mb-1">
              Credit Amount
            </label>
            <input
              type="number"
              name="creditAmount"
              value={formdata.creditAmount}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter credit amount (can be negative)"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmittingrepoComp;
