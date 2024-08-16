import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LineChart from "../LineChart";

function CryptoPage() {
  const { cryptoId } = useParams();
  const [crypto, setCrypto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCryptoById() {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${cryptoId}` // Fetch data for the specific cryptocurrency
      );
      const data = await response.json();
      setCrypto(data);
    }

    fetchCryptoById();
  }, [cryptoId]);

  if (!crypto) {
    return <div className="spinner ml-[500px]"></div>;
  }

  return (
    <div>
      <div className="grid grid-cols-12 mt-[50px]">
        <div className="col-span-4 border-r pr-[20px] ">
          <div className="flex justify-center items-center">
            <img
              className="h-[200px]"
              src={crypto.image.small}
              alt={`${crypto.name} logo`}
            />
          </div>
          <h2 className="text-2xl font-bold  text-center text-[48px] mt-[20px] mb-[20px]">
            {crypto.name}
          </h2>
          <p className="text-center">{crypto.description.en.slice(0, 200)}</p>
          <p className="text-center">
            <span className="text-white text-[24px] font-bold">Rank:</span>
            {crypto.market_cap_rank}
          </p>
          <p className="text-center">
            <span className="text-white text-[24px] font-bold">
              Current Price:{" "}
            </span>
            ${crypto.market_data.current_price.usd.toLocaleString()}
          </p>
          <p className="text-center ">
            <span className="text-white text-[24px] font-bold">
              Market Cap:
            </span>{" "}
            ${crypto.market_data.market_cap.usd.toLocaleString()}
          </p>
        </div>
        <div className="col-span-8 ml-[20px]">
          <LineChart />
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="border p-4 rounded-md bg-blue-700 text-white"
          onClick={() => navigate("/")}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default CryptoPage;
CryptoPage.js;
