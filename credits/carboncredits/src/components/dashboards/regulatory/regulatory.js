import React, { useState } from "react";
import Nav from "../../../utils/Header";
import { BrowserProvider, Contract } from "ethers";
import contractabi from "../../../utils/contractabi";

function RegulatoryAuthorityDash() {
  const [approvedSuppliers, setApprovedSuppliers] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null); // State for storing PDF URL
  const contractAddress = "0x7B0D279c6eFafa385209F4CC83210F2264A30bdF";
  const backendUrl = "http://localhost:4000";

  const loadApprovedSuppliers = async () => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractabi, signer);

      const suppliers = await contract.viewPendingReportsForRegulator();
      const formattedSuppliers = suppliers.map((supplier) => ({
        supplierAddress: supplier[7],
        projectName: supplier[0],
        location: supplier[2],
        projectrepo: supplier[3],
        creditAmount: Number(supplier[4]),
        id: Number(supplier[8]),
        subid: Number(supplier[6]),
      }));
      setApprovedSuppliers(formattedSuppliers);
    } catch (error) {
      console.error("Error fetching approved suppliers:", error);
    }
  };

  const handleMint = async (supplierAddress, reportId) => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractabi, signer);

      const tx = await contract.mintCredits(supplierAddress, reportId);
      await tx.wait();
      loadApprovedSuppliers();
    } catch (error) {
      console.error("Error minting tokens:", error);
    }
  };

  const handleReject = async (reportId) => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractabi, signer);

      const tx = await contract.rejectApprovedReport(reportId);
      await tx.wait();
      loadApprovedSuppliers();
    } catch (error) {
      console.error("Error rejecting supplier:", error);
    }
  };

  const requestMintApproval = (reportId) => {
    setSelectedReport(reportId);
  };

  const handleReportView = async (reportPDF) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${backendUrl}/proxy/${encodeURIComponent(reportPDF)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setPdfUrl(url);
      setLoading(false);
    } catch (error) {
      console.error("Error viewing report:", error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] ">
      <header className="w-full h-[11vh]  shadow-2xl flex flex-col justify-between p-1">
        <Nav />
      </header>

      <div className="h-[80vh] mt-1 flex flex-col overflow-scroll items-center">
        <button
          onClick={loadApprovedSuppliers}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Load Approved Suppliers
        </button>

        <div className="w-full max-w-3xl flex flex-col items-center space-y-4">
          {approvedSuppliers.length === 0 ? (
            <p>No approved suppliers available</p>
          ) : (
            approvedSuppliers.map((supplier) => (
              <div
                key={supplier.id}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-lg"
              >
                <h2 className="text-lg font-bold">
                  Supplier Address: {supplier.supplierAddress}
                </h2>
                <p>Project ID: {supplier.id}</p>
                <p>Project Sub ID: {supplier.subid}</p>
                <p>Project Name: {supplier.projectName}</p>
                <p>Credit Amount: {supplier.creditAmount}</p>
                <p
                  onClick={() => handleReportView(supplier.projectrepo)}
                  className="cursor-pointer text-blue-500 underline"
                >
                  View Report PDF
                </p>

                <button
                  onClick={() => requestMintApproval(supplier.id)}
                  className="mt-3 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                >
                  Request Mint Approval Options
                </button>

                {selectedReport === supplier.id && (
                  <div className="flex space-x-4 mt-3">
                    <button
                      onClick={() =>
                        handleMint(supplier.supplierAddress, supplier.id)
                      }
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                    >
                      Mint Grank Tokens
                    </button>
                    <button
                      onClick={() => handleReject(supplier.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {loading && <p className="mt-4 text-gray-700">Loading PDF...</p>}
        {pdfUrl && (
          <div className="fixed top-0 flex flex-col justify-center bg-gray-800 items-center w-full h-full">
            <button
              onClick={() => setPdfUrl(null)}
              className="mb-4 px-4 py-2 bg-green-600 text-white font-bold rounded"
            >
              Close
            </button>
            <iframe
              src={pdfUrl}
              width="80%"
              height="90%"
              className="border"
              title="Report PDF"
            ></iframe>
          </div>
        )}
      </div>

      <footer className="w-full h-[8vh] flex justify-center items-center bg-black text-white">
        © Copyright
      </footer>
    </div>
  );
}

export default RegulatoryAuthorityDash;
