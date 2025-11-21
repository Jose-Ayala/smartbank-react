import React, { createContext, useState, useContext } from 'react';

const AccountContext = createContext();

// Hardcoded account list
const initialAccounts = [
  { 
    id: 'c1', 
    name: "SmartBank Checking", 
    type: "deposit",
    number: "XXX4567", 
    balance: 2575.50
  },
  { 
    id: 's1', 
    name: "SmartBank Savings", 
    type: "deposit",
    number: "XXX9876", 
    balance: 57900.25
  },
  { 
    id: 'cd6m', 
    name: "6 Month CD", 
    type: "cd",
    number: "XXX1122", 
    balance: 5000.00,
    maturityDate: "07/31/2028"
  },
  { 
    id: 'mort', 
    name: "Mortgage", 
    type: "loan",
    number: "XXX3344", 
    balance: 165850.25
  },
  { 
    id: 'cc', 
    name: "SmartBank Credit Card", 
    type: "credit",
    number: "XXX5566", 
    balance: 8700.75
  },
];

export const AccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState(initialAccounts);

  const addAccount = (newAccountData) => {
    
    const newAccount = {
      id: `new-${Date.now()}`, 
      name: newAccountData.product.name,
      number: `***${Math.floor(Math.random() * 9000) + 1000}`,
      balance: newAccountData.amount, 
    };

    setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
  };

  return (
    <AccountContext.Provider value={{ accounts, addAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccounts = () => {
  return useContext(AccountContext);
};