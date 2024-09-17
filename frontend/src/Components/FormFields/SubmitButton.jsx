import React from "react";
import { ThreeDots } from "react-loader-spinner";

export default function SubmitButton({isSubmitting,text}) {
  return (
    <button
      type="submit"
      className="w-full px-4 py-2 bg-primary text-white rounded-md"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <div className="p-2 flex justify-center">
          <ThreeDots
            visible={true}
            height="10"
            width="80"
            color="#fff"
            radius="1"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        text
      )}
    </button>
  );
}
