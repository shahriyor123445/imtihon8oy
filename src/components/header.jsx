import React from "react";
import { Link } from "react-router-dom";
import { useCrypto } from "./CryptoContext";

export default function Header() {
  const { handleDrawerToggle } = useCrypto();

  return (
    <div className="max-w-[1280px] flex justify-between items-center mx-auto mt-[10px] mb-[10px] ">
      <Link
        className="text-primary text-xl font-bold pt-4 text-[#87CEEB]"
        to={"/"}
      >
        CRYPTOFOLID
      </Link>
      <div>
        <select className="bg-transparent border-none text-white outline-none">
          <option className="bg-black" value="someOption">
            USD
          </option>
          <option className="bg-black" value="otherOption">
            EUR
          </option>
          <option className="bg-black" value="otherOption">
            JPY
          </option>
        </select>
        <button
          onClick={() => handleDrawerToggle({})}
          className="bg-primary py-2 px-3 rounded-md ml-4 bg-[#87CEEB] "
        >
          WATCH LIST
        </button>
      </div>
    </div>
  );
}
