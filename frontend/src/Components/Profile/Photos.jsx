import React from 'react'
import summaryApi from "../../../common/index";
import { Link } from 'react-router-dom';


export default function Photos({photo,id}) {
  return (
    <>  
      <Link to={`/posts/${id}`}>
          <img
            className="w-full h-64 rounded-3xl transform transition-transform duration-300 hover:scale-110 object-cover mb-0"
            src={`${summaryApi.domain.url}/uploads/${photo}`}
            alt="Photo"
          />
        </Link>
    </>
  )
}
