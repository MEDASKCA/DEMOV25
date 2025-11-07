'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context data
interface HospitalContextType {
  hospital: string;
  setHospital: (hospital: string) => void;
}

// Create the context with a default value
const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

// Create the provider component
export const HospitalProvider = ({ children }: { children: ReactNode }) => {
  const [hospital, setHospital] = useState('default_hospital');

  return (
    <HospitalContext.Provider value={{ hospital, setHospital }}>
      {children}
    </HospitalContext.Provider>
  );
};

// Create a custom hook for using the context
export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (context === undefined) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
};
