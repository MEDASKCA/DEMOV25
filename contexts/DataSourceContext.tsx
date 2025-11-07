'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context data
interface DataSourceContextType {
  source: string;
  setSource: (source: string) => void;
}

// Create the context with a default value
const DataSourceContext = createContext<DataSourceContextType | undefined>(undefined);

// Create the provider component
export const DataSourceProvider = ({ children }: { children: ReactNode }) => {
  const [source, setSource] = useState('default');

  return (
    <DataSourceContext.Provider value={{ source, setSource }}>
      {children}
    </DataSourceContext.Provider>
  );
};

// Create a custom hook for using the context
export const useDataSource = () => {
  const context = useContext(DataSourceContext);
  if (context === undefined) {
    throw new Error('useDataSource must be used within a DataSourceProvider');
  }
  return context;
};
