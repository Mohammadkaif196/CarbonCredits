import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-gray-300 p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* About Us Section */}
      <div>
        <h3 className="text-lg font-bold text-green-500 mb-4">About Us</h3>
        <ul className="space-y-2">
          <li>
            <a href="#" className="hover:text-green-400">
              Our Mission
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-400">
              Vision & Values
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-400">
              Team
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-400">
              Careers
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-400">
              News & Events
            </a>
          </li>
        </ul>
      </div>

      {/* Resources Section */}
      <div>
        <h3 className="text-lg font-bold text-green-500 mb-4">Resources</h3>
        <ul className="space-y-2">
          <li>
            <a href="#" className="hover:text-green-400">
              Developer Docs
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-400">
              API Reference
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-400">
              Smart Contracts
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-400">
              GitHub Repository
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-400">
              Help Center
            </a>
          </li>
        </ul>
      </div>

      {/* Marketplace Section */}
      <div>
        <h3 className="text-lg font-bold text-green-500 mb-4">Marketplace</h3>
        <ul className="space-y-2">
          <li>
            <a href="#" className="hover:text-green-400">
              Explore Carbon Credits
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-400">
              Buy CCT Tokens
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-400">
              Sell or Trade Credits
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-400">
              Suppliers & Auditors
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-400">
              Verified Credits
            </a>
          </li>
        </ul>
      </div>

      {/* Social Media Section */}
      <div>
        <h3 className="text-lg font-bold text-green-500 mb-4">
          Connect With Us
        </h3>
        <ul className="space-y-2">
          <li>
            <a href="#" className="hover:text-green-400">
              Facebook
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-400">
              Instagram
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-400">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-400">
              Twitter
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-400">
              Contact Support
            </a>
          </li>
        </ul>
      </div>

      {/* Additional Information Section */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-8 text-xs text-gray-400 text-center">
        <p>
          This Portal is a Mission Mode Project under the National E-Governance
          Plan, and is owned, designed, and developed by the National
          Informatics Centre (NIC), Ministry of Electronics & Information
          Technology, Government of India. The content linked through NPI is
          owned and maintained by the respective Ministries/Departments.
        </p>
        <p className="mt-4">
          Our Decentralized Carbon Credit Marketplace ensures accountability,
          transparency, and a fraud-resistant environment by enabling timely and
          secure carbon credit trading. The marketplace is regulated by the
          Government of India and empowers participants to trade verified carbon
          credits efficiently. Suppliers, buyers, and auditors work seamlessly
          within the platform, preventing fraudulent activities and promoting
          sustainable practices.
        </p>
        <p className="mt-2">Certified Quality Website - CQW</p>
        <p>Last reviewed and updated on 20 Oct, 2024 NPI 1</p>
        <p className="mt-4">
          &copy; 2024 Decentralized Carbon Credit Marketplace. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
