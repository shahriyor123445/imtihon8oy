import React, { createContext, useContext, useState } from "react";

const CryptoContext = createContext();

export function CryptoProvider({ children }) {
  const [selectedCryptos, setSelectedCryptos] = useState(() => {
    const savedCryptos = localStorage.getItem("selectedCryptos");
    return savedCryptos ? JSON.parse(savedCryptos) : [];
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = (crypto) => {
    const isSelected = selectedCryptos.some(
      (selectedCrypto) => selectedCrypto.id === crypto.id
    );

    let updatedCryptos;
    if (isSelected) {
      updatedCryptos = selectedCryptos.filter(
        (selectedCrypto) => selectedCrypto.id !== crypto.id
      );
      setSelectedCryptos(updatedCryptos);
      if (updatedCryptos.length === 0) {
        setIsDrawerOpen(false);
      }
    } else {
      updatedCryptos = [...selectedCryptos, crypto];
      setSelectedCryptos(updatedCryptos);
      setIsDrawerOpen(true);
    }

    localStorage.setItem("selectedCryptos", JSON.stringify(updatedCryptos));
  };

  return (
    <CryptoContext.Provider
      value={{
        selectedCryptos,
        isDrawerOpen,
        handleDrawerToggle,
        setIsDrawerOpen,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export function useCrypto() {
  return useContext(CryptoContext);
}

