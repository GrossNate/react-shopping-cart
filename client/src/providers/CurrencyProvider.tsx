import { createContext, useState, ReactNode } from 'react';
import { Currencies, Currency } from '../../types';

export const CurrencyContext = createContext({
  displayCurrency: { currency: 'USD', rate: 1 },
  handleCurrencyChange: (_: Currency) => {},
});

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [displayCurrency, setDisplayCurrency] = useState({
    currency: 'USD',
    rate: 1,
  });
  const handleCurrencyChange = (displayCurrency: Currency) => {
    setDisplayCurrency(displayCurrency);
  };
  return (
    <CurrencyContext.Provider value={{ displayCurrency, handleCurrencyChange }}>
      {children}
    </CurrencyContext.Provider>
  );
};
