import React, { useState } from 'react';
import { PiSpeakerSimpleHighLight, PiSpeakerSimpleSlash } from 'react-icons/pi';

const VideoComp = ({ videoAd }) => {
  const [mute, setMute] = useState(true);
  return (
    <div className="relative w-full">
      {/* Background Video */}
      <video
        src={videoAd}
        autoPlay
        loop
        muted={mute}
        playsInline
        className="w-full h-[500px] md:h-[700px] object-cover rounded-xl shadow-lg"
      />

      {/* Overlay Gradient for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

      {/* Mute / Unmute Toggle */}
      <button
        onClick={() => setMute((prev) => !prev)}
        className="absolute bottom-6 right-6 bg-black/40 hover:bg-black/70 transition-colors p-3 rounded-full backdrop-blur-md shadow-md"
      >
        {mute ? (
          <PiSpeakerSimpleSlash className="text-2xl sm:text-3xl text-white" />
        ) : (
          <PiSpeakerSimpleHighLight className="text-2xl sm:text-3xl text-white" />
        )}
      </button>
    </div>

  );
};

export default VideoComp;
