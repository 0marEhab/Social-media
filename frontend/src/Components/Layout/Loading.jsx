import React from "react";
import {RotatingLines} from "react-loader-spinner";

export default function Loading({color}) {
  return (
    <div className="w-full min-h-screen -my-12 flex justify-center items-center">
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
        strokeColor={color}
      />
    </div>
  );
}
