import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import contractabi from "../../../utils/contractabi";
import Nav from "../../../utils/Header";

const contractAddress = "0x7B0D279c6eFafa385209F4CC83210F2264A30bdF";

function Auditordash() {
  const [pendingReports, setPendingReports] = useState([]);
  const [approvedReports, setApprovedReports] = useState([]);
  const [rejectedReports, setRejectedReports] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState("pending");

  useEffect(() => {
    loadReports();
  }, [currentPage]);

  const loadReports = async () => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractabi, signer);

      if (currentPage === "pending") {
        const reports = await contract.viewPendingReportsForAuditor();
        setPendingReports(formatReports(reports));
      } else if (currentPage === "approved") {
        const reports = await contract.getApprovedReportsForAuditor();
        setApprovedReports(formatReports(reports));
      } else if (currentPage === "rejected") {
        const reports = await contract.getRejectedReportsForAuditor();
        setRejectedReports(formatReports(reports));
      }
    } catch (error) {
      console.error("Error loading reports:", error);
    }
  };

  const formatReports = (reports) =>
    reports.map((report) => ({
      id: Number(report[8]),
      subid: Number(report[6]),
      projectName: report[0],
      supplieradd: report[7],
      reportPDF: report[3],
      companyPhone: report[1],
      geographicLocation: report[2],
      creditAmount: Number(report[4]),
      date: new Date(Number(report[5]) * 1000).toLocaleDateString(),
    }));

  const handleApprove = async (supplier, reportId) => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractabi, signer);
      await contract.approveReportByAuditor(supplier, reportId);
      loadReports();
    } catch (error) {
      console.error("Error approving report:", error);
    }
  };

  const handleReject = async (reportId, supplierAddress) => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractabi, signer);
      
      await contract.rejectReportByAuditor(supplierAddress, reportId);
      loadReports();  
    } catch (error) {
      console.error("Error rejecting report:", error);
    }
  };

  const handleReportView = async (reportPDF) => {
    try {
      const response = await fetch(
        `http://localhost:4000/proxy/${encodeURIComponent(reportPDF)}`
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const blob = await response.blob();
      setPdfUrl(window.URL.createObjectURL(blob));
    } catch (error) {
      console.error("Error viewing report:", error);
    }
  };

  return (
    <div className="w-full h-[100vh]">
      <header className="w-full h-[11vh] shadow-2xl flex flex-col justify-between p-1">
        <Nav />
      </header>
      {/* Navbar */}
      <nav className="flex justify-around bg-gray-800 text-white py-4">
        <button
          onClick={() => setCurrentPage("pending")}
          className={`${
            currentPage === "pending" ? "bg-orange-500 text-red-500" : ""
          } py-2 px-4`}
        >
          Pending
        </button>
        <button
          onClick={() => setCurrentPage("approved")}
          className={`${
            currentPage === "approved" ? "bg-orange-500 text-red-500" : ""
          } py-2 px-4`}
        >
          Approved
        </button>
        <button
          onClick={() => setCurrentPage("rejected")}
          className={`${
            currentPage === "rejected" ? "bg-orange-500 text-red-500" : ""
          } py-2 px-4`}
        >
          Rejected
        </button>
      </nav>

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{currentPage} Requests</h1>
        <div className="w-full max-w-3xl mx-auto space-y-4">
          {(currentPage === "pending" ? pendingReports : currentPage === "approved" ? approvedReports : rejectedReports).map(
            (report) => (
              <div key={report.id} className="p-4 border rounded-lg shadow-lg">
                <p><strong>Report ID:</strong> {report.id}</p>
                <p><strong>Sub ID:</strong> {report.subid}</p>
                <p><strong>Project Name:</strong> {report.projectName}</p>
                <p><strong>Supplier Address:</strong> {report.supplieradd}</p>
                <p><strong>Company Phone:</strong> {report.companyPhone}</p>
                <p><strong>Location:</strong> {report.geographicLocation}</p>
                <p><strong>Credits:</strong> {report.creditAmount}</p>
                <p><strong>Date:</strong> {report.date}</p>
                <p onClick={() => handleReportView(report.reportPDF)} className="text-blue-500 cursor-pointer">View PDF</p>
                
                {currentPage === "pending" && (
                  <div className="flex space-x-4 mt-3">
                    <button onClick={() => handleApprove(report.supplieradd, report.id)} className="bg-green-500 text-white px-4 py-2 rounded">
                      Approve
                    </button>
                    <button onClick={() => handleReject(report.id, report.supplieradd)} className="bg-red-500 text-white px-4 py-2 rounded">
                      Reject
                    </button>
                  </div>
                )}
              </div>
            )
          )}
          {pdfUrl && (
            <div className="fixed top-0 flex flex-col justify-center bg-slate-600 items-center w-[1000px] h-[900px]">
              <button onClick={() => setPdfUrl(null)} className="bg-green-600 text-black p-2 rounded">
                Close
              </button>
              <iframe src={pdfUrl} width="80%" height="90%" title="Report PDF"></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auditordash;
