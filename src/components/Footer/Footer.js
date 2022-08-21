import moment from "moment";
import React from "react";

const Footer = () => {
  return (
    <>
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        Copyright &copy; {moment(Date.now()).year()} | TaskHub
      </span>
    </>
  );
};

export default Footer;
