import { Carousel } from "flowbite-react";
import React from "react";

export default function HeroSection({ carouselElements = [] }) {
  const filteredElements = carouselElements.filter(
    (item) => item.image && item.name
  );

  return (
    <div
      className="  hero bg-cover text-center text-white"
      style={{
        backgroundImage: `url(/background.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "400px",
        width: "100%",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <div className=" min-h-60 p-8 ">
        <h1 className="text-[72px] text-blue">CRYPTOFOLIO WATCH LIST</h1>
        <p className="text-blu">
          Get all the Info regarding your favorite Crypto Currency
        </p>
        <div className="h-[200px]">
          <Carousel leftControl="" rightControl="">
            {filteredElements
              .reduce((resultArray, item, index) => {
                const chunkIndex = Math.floor(index / 4);

                if (!resultArray[chunkIndex]) {
                  resultArray[chunkIndex] = [];
                }

                resultArray[chunkIndex].push(item);

                return resultArray;
              }, [])
              .map((group, i) => (
                <div key={i} className="flex justify-center gap-32">
                  {group.map((crypto) => (
                    <div key={crypto.id} className="text-center">
                      <img
                        src={crypto.image}
                        alt={`${crypto.name}`}
                        className="w-[80px] h-[80px] mb-[10px] mx-auto"
                      />
                      <div className="flex items-center justify-center space-x-2 text-center">
                        <p>{crypto.name}</p>
                        <span
                          className={`${
                            crypto.price_change_percentage_24h < 0
                              ? "text-red-500"
                              : "text-green-500"
                          } `}
                        >
                          {crypto.price_change_percentage_24h.toFixed(2)}%
                        </span>
                      </div>

                      <p className="mt-[10px]">
                        ${crypto.current_price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
HeroSection.js;

