import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";

function ImgCarousell() {
  return (
    <Carousel
      infiniteLoop={true}
      showArrows={true}
      showThumbs={false}
      stopOnHover={true}
      showStatus={false}
      autoPlay={true} // Optional: autoplay for a smoother experience
      interval={3000} // Optional: set the interval for autoplay
      className="pt-2 pb-2 overflow-hidden" // Set max height to 150px
    >
      <div className="relative h-full">
        <img
          src="img2.png"
          alt="Eco-Friendly Initiative"
          className="object-cover w-full h-full transition duration-500 ease-in-out transform hover:scale-105" // Added transition and hover effect
        />
      </div>

      {/* First Slide */}
      <div className="relative h-full text-black">
        <img
          src="img1.png"
          alt="Carbon Trading"
          className="object-contain  w-full h-full transition duration-500 ease-in-out transform hover:scale-105" // Added transition and hover effect
        />
      </div>

      {/* Second Slide */}

      {/* Third Slide */}
      <div className="relative h-full">
        <img
          src="imh3.png"
          alt="Carbon Trading"
          className="object-cover w-full h-full transition duration-500 ease-in-out transform hover:scale-105" // Added transition and hover effect
        />
      </div>
    </Carousel>
  );
}

export default ImgCarousell;
