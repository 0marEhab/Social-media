import React from 'react'
import summaryApi from "../../../common/index";

export default function Videos({video}) {
  return (
    <>
          <video
            className="w-full h-64 rounded-lg mb-0"
            controls
          >
            <source src={`${summaryApi.domain.url}/uploads/${video}`} type="video/mp4"  />
            Your browser does not support the video tag.
          </video>
    
    </>
  )
}
