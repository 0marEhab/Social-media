import React from 'react'
import summaryApi from "../../../common/index";
import { Link } from 'react-router-dom';

export default function Videos({video,id}) {
  return (
    <>
         <Link to={`/posts/${id}`}>
  <video
    className="w-full h-64 rounded-lg mb-0 transform transition-transform duration-300 hover:scale-110" // Add transform and hover scale
    controls
  >
    <source src={`${summaryApi.domain.url}/uploads/${video}`} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</Link>

    
    </>
  )
}
