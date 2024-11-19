import React from "react";
import { Header } from "../utils/Header";
import CarbonCreditDesc from "../components/home/carousel";
import Footer from "../utils/Footer";
import ImgCarousell from "../components/home/imgcarousel";
import CarbonCreditsRules from "../components/home/ccrules";
import WhyUseCarbonCredits from "../components/home/usecarboncred";
import OurMission from "../components/home/ourmission";
import OurActivities from "../components/home/ouractivities";
import CarbonTradingVideo from "../components/home/carboncredittradingvideo";

function Homepage() {
  return (
    <div className="w-full pt-32 min-h-screen">
      <Header />
      <div>
        <ImgCarousell />
      </div>
      <CarbonCreditDesc />
      <WhyUseCarbonCredits />
      <OurMission />
      <OurActivities />
      <CarbonTradingVideo />
      <CarbonCreditsRules />
      <Footer />
    </div>
  );
}

export default Homepage;
