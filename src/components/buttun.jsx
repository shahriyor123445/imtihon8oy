import React from "react";

function buttun() {
  return (
    <div className="flex gap-6">
      <button className="border w-[200px] text-start rounded-md pl-3 h-[41px] bg-blue text-black font-bold border-blue">
        24 Hours
      </button>
      <button className="border w-[200px] text-start rounded-md pl-3 hover:bg-blue">
        30 Days
      </button>
      <button className="border w-[200px] text-start rounded-md pl-3 hover:bg-blue">
        3 Months
      </button>
      <button className="border w-[200px] text-start rounded-md pl-3 hover:bg-blue">
        1 Year
      </button>
    </div>
  );
}

export default buttun;
