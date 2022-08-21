import React, { useState } from "react";

const ConfirmAction = ({ btnText, fn }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="bg-[#EC5252] text-gray-200 hover:bg-red-600 hover:text-white
                          px-3 py-2 rounded-md text-sm font-medium ml-5 hover:cursor-pointer"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {btnText}
      </button>
      {showModal ? (
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
          <div className="bg-white px-16 py-14 rounded-md text-center">
            <h1 className="text-xl mb-4 font-bold text-slate-500">
              Do you Want Delete
            </h1>
            <button
              className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
              onClick={fn}
            >
              Ok
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ConfirmAction;
