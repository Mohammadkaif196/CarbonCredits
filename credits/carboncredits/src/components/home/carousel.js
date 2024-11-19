import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";

// Data Array for Carousel
const carouselData = [
  {
    title: "Empowering Sustainable Carbon Markets",
    content:
      "Our Carbon Credit dApp revolutionizes the way carbon credits are managed and traded by leveraging blockchain technology. Through the power of smart contracts, we ensure a transparent, secure, and decentralized environment where businesses and individuals can actively offset their carbon footprint. Tokenized CCT (Carbon Credit Tokens) make it simple to buy, sell, or retire credits, contributing to the fight against climate change.",
  },
  {
    title: "Seamless and Secure User Experience",
    content:
      "Users register and log in easily through MetaMask integration, which eliminates the need for passwords and central credentials. Each participant—suppliers, auditors, regulatory authorities, and buyers—receives a unique NFT identity upon signup, enabling easy verification and tracking of their activities. With our decentralized login, the platform ensures secure access and gives users complete control over their data.",
  },
  {
    title: "Dynamic Marketplace for Carbon Credits",
    content:
      "Our marketplace enables direct interaction between suppliers, buyers, and other participants, ensuring efficient trading of CCT tokens. Suppliers can list verified credits, and buyers can purchase directly or from other sellers in the market. Auditors verify eco-friendly activities, while regulatory authorities oversee compliance, ensuring a robust and trustworthy ecosystem for carbon credit trading.",
  },
  {
    title: "Real-time Tracking and Regulatory Transparency",
    content:
      "The platform features an intuitive dashboard where users can track their carbon credits in real-time, view carbon offset contributions, and monitor their trading history. Every transaction is powered by smart contracts, ensuring transparency and accountability. With integration into Ethereum’s blockchain, the system is tamper-proof, helping users align with global sustainability goals while fostering trust in carbon markets.",
  },
];

function CarbonCreditDesc() {
  return (
    <div className="w-full min-h-[50vh] h-auto flex flex-col items-center  text-white p-8">
      <div className="w-[90vw] mb-8 flex flex-col justify-start items-start">
        <h2 className="text-2xl text-left font-extrabold italic text-green-700 mb-4">
          🌍 Carbon Credit Trading Platform – Empowering Sustainability with
          Blockchain
        </h2>
        <p className="text-lg text-left">
          Our Carbon Credit dApp is an innovative decentralized application that
          leverages the power of blockchain to promote environmental
          sustainability through the seamless trading and management of carbon
          credits. Built on the Ethereum network, the platform provides a
          transparent, tamper-proof, and secure solution for individuals and
          businesses to participate in carbon offset initiatives.
        </p>
      </div>

      <Carousel
        infiniteLoop={true}
        showArrows={true}
        showThumbs={false}
        stopOnHover={true}
        showStatus={false}
        autoPlay={true}
        interval={4000}
        className="w-[90vw] lg:w-[4/5]"
      >
        {carouselData.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-gray-800 shadow-lg text-white rounded-md h-auto flex flex-col space-x-2 justify-start items-start space-y-4"
          >
            <h3 className="text-xl font-bold text-left text-green-600">
              {item.title}
            </h3>
            <p className="text-left leading-relaxed">{item.content}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarbonCreditDesc;
