import React from "react";

const EmptyData = ({ message }) => {
  return (
    <>
      <div className=" bg-gray-50 flex flex-col justify-center relative overflow-hidden sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
              <i className="fa-solid fa-0 text-2xl w-8 h-8 text-purple-600"></i>
              <div className="space-y-2">
                <p className="text-slate-800 mt-2 font-bold">{message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyData;
