import React from 'react'

export default function Photos() {

    const Photo="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/bef54506-ea45-4e42-a1b6-23a48f61c5e8";
  return (
    <>
    
    <img
            className="w-full h-64 rounded-3xl object-cover mb-0"
            src={Photo}
            alt="Photo"
          />
    </>
  )
}
