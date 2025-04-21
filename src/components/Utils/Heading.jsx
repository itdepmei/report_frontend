import React from "react";

const Heading = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8 max-w-[800px] mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-2 lg:text-3xl">
        {title}
      </h1>

      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
};

export default Heading;
