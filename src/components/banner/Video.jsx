import React from 'react'
import videoAd from '../../assets/videos/master_of_Strings_1920x720.webm'
const VideoView = () => {
  return (
    <div className='video-container'>
    
        <video src={videoAd} autoPlay loop muted={true}  className='h-96 md:h-max w-full object-cover'/>

    </div>
  )
}

export default VideoView