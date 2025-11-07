'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context data
interface ListeningContextType {
  isListening: boolean;
  setIsListening: (isListening: boolean) => void;
}

// Create the context with a default value
const ListeningContext = createContext<ListeningContextType | undefined>(undefined);

// Create the provider component
export const ListeningProvider = ({ children }: { children: ReactNode }) => {
  const [isListening, setIsListening] = useState(false);

  return (
    <ListeningContext.Provider value={{ isListening, setIsListening }}>
      {children}
    </ListeningContext.Provider>
  );
};

// Create a custom hook for using the context
export const useListening = () => {
  const context = useContext(ListeningContext);
  if (context === undefined) {
    throw new Error('useListening must be used within a ListeningProvider');
  }
  return context;
};
