import React from 'react'
import summaryApi from "../../../common/index";


export default function Photos({photo}) {
  return (
    <>
          <img
            className="w-full h-64 rounded-3xl object-cover mb-0"
            src={`${summaryApi.domain.url}/uploads/${photo}`}
            alt="Photo"
          />
    </>
  )
}
