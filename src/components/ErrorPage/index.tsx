import { ErrorType } from "@/types";
import React from "react";
import emptySvg from "@assets/emptySvg.svg";

const index: React.FC<ErrorType> = ({
  text = "Sorry we couldn't find the page you're looking for",
  buttonLink = "/dashboard",
  buttonText = "Back to Dashboard",
}) => {
  return (
    <>
      <div className="h-screen w-screen bg-gray-50 flex items-center">
        <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
          <div className="w-full lg:w-1/2 mx-8">
            <div className="text-7xl text-green-500 font-dark font-extrabold mb-8"> 404</div>
            <p className="text-2xl md:text-3xl font-light leading-normal mb-8">{text}</p>

            <a
              href={buttonLink}
              className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
            >
              {buttonText}
            </a>
          </div>
          <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
            <img src={emptySvg} height={500} width={400} alt="not-found" />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
