import React from "react";

const ErrorMsg = ({ error }) => {
  return <p className="text-red-500 text-sm mt-1">{error}</p>;
};

export default ErrorMsg;