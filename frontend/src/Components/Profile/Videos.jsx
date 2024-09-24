import React from 'react'

export default function Videos() {
    const video="https://www.w3schools.com/html/mov_bbb.mp4"
  return (
    <>
          <video
            className="w-full h-auto rounded-lg mb-0"
            controls
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
    
    </>
  )
}
