import React from "react";

const CarbonTradingVideo = () => {
  return (
    <div className="container mx-auto p-6 text-center">
      <h2 className="text-2xl font-semibold mb-4">
        What Exactly is Carbon Trading
      </h2>
      <div className="flex justify-center">
        <iframe
          className="rounded-lg border-0"
          src="https://www.youtube.com/embed/k0Kp5fwaEds?autoplay=1&mute=1&vq=hd720&rel=0"
          title="What Exactly is Carbon Trading"
          allow="autoplay; encrypted-media"
          allowFullScreen
          width="720"
          height="405"
          frameBorder="0"
        />
      </div>
    </div>
  );
};

export default CarbonTradingVideo;
