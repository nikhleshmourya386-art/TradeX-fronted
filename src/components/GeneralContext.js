// src/context/GeneralContext.js
import React, { useState, createContext } from "react";
import BuyActionWindow from "../components/BuyActionWindow"; // adjust path if needed

const GeneralContext = createContext({
  openBuyWindow: () => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = ({ children }) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockName, setSelectedStockName] = useState("");

  // ✅ This function will be called from anywhere like Watchlist card or Holdings row
  const openBuyWindow = (stockName) => {
    setIsBuyWindowOpen(true);
    setSelectedStockName(stockName);
  };

  const closeBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockName("");
  };

  return (
    <GeneralContext.Provider value={{ openBuyWindow, closeBuyWindow }}>
      {children}
      {isBuyWindowOpen && <BuyActionWindow stockName={selectedStockName} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
