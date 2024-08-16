import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Pagination,
} from "flowbite-react";

import { FiEye } from "react-icons/fi";
import { useCrypto } from "../CryptoContext";
import HeroSection from "../HeroSection";
import { DrawerComponent } from "../DrawerComponent";
import { Link } from "react-router-dom";

export default function CryptoTable() {
  const [cryptos, setCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(249);
  const { selectedCryptos, isDrawerOpen, handleDrawerToggle, setIsDrawerOpen } =
    useCrypto();

  const cryptosPerPage = 10;

  useEffect(() => {
    async function fetchCryptos() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=${cryptosPerPage}&page=${currentPage}&sparkline=false&price_change_percentage=24h`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCryptos(data);
        setFilteredCryptos(data);
        setTotalPages(25);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCryptos();
  }, [currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = cryptos.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(value) ||
        crypto.symbol.toLowerCase().includes(value)
    );
    setFilteredCryptos(filtered);
  };
  if (loading) {
    return <div className="spinner ml-[500px]"></div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div>
      <HeroSection carouselElements={selectedCryptos} />
      <div className="max-w-[1280px] mx-auto bg-black">
        <h1 className="text-center font-bold text-[34px] mt-[18px] mb-[12px]">
          Cryptocurrency Prices by Market Cap
        </h1>
        <input
          className="w-full border rounded-md bg-black h-[61px] pl-8 mb-[20px] text-white"
          placeholder="Search For a Crypto Currency..."
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Table>
          <TableHead className="bg-blue border-b">
            <TableHeadCell className="text-left bg-blue">Coin</TableHeadCell>
            <TableHeadCell className="text-right bg-blue">Price</TableHeadCell>
            <TableHeadCell className="text-right bg-blue">
              24h Change
            </TableHeadCell>
            <TableHeadCell className="text-right bg-blue">
              Market Cap
            </TableHeadCell>
          </TableHead>
          <TableBody>
            {filteredCryptos.map((crypto) => (
              <TableRow key={crypto.id} className="border-b">
                <TableCell>
                  <div className="">
                    <Link
                      className="flex items-center"
                      to={`/crypto/${crypto.id}`}
                    >
                      <img
                        src={crypto.image}
                        alt={crypto.name}
                        className="w-12 h-12 mr-4"
                      />
                      <div>
                        <p className="uppercase text-white">{crypto.symbol}</p>
                        <p>{crypto.name}</p>
                      </div>
                    </Link>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  ${crypto.current_price.toFixed(2)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end">
                    <div
                      className={`mr-2 cursor-pointer ${
                        selectedCryptos.some(
                          (selectedCrypto) => selectedCrypto.id === crypto.id
                        )
                          ? "text-green-500"
                          : ""
                      }`}
                      onClick={() => handleDrawerToggle(crypto)}
                    >
                      <FiEye />
                    </div>
                    <span
                      className={`${
                        crypto.price_change_percentage_24h < 0
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  ${crypto.market_cap.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
          />
        </div>
        {isDrawerOpen && (
          <DrawerComponent
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            selectedItems={selectedCryptos}
          />
        )}
      </div>
    </div>
  );
}

