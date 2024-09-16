import React from "react";
import {RotatingLines} from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
        strokeColor="#666AEC"
      />
    </div>
  );
}
