import React, { useState } from 'react'
import { PiSpeakerSimpleHighLight, PiSpeakerSimpleSlash } from "react-icons/pi";

const VideoComp = ({videoAd}) => {
    const [mute, setMute] = useState(true)
  return (
    <div className='relative'>
        <video src={videoAd} autoPlay loop muted={mute} className="h-96 md:h-max w-full object-cover" />
        <span className='absolute rounded top-[80%] right-[20%] bg-white/20 cursor-pointer' onClick={()=> setMute(prev => !prev)}>{mute ?  <PiSpeakerSimpleSlash className='text-2xl sm:text-4xl' />:  <PiSpeakerSimpleHighLight className='text-2xl sm:text-4xl' />}</span> 
    </div>
  )
}

export default VideoComp