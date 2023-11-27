import React, { createContext, useContext, useState } from 'react';

const TourContext = createContext({
  tourType: 'default',
  setTourType: (type: string) => {},
});

export const useTour = () => useContext(TourContext);

export const TourProvider = ({ children }: { children: React.ReactNode }) => {
  const [tourType, setTourType] = useState('default');

  return <TourContext.Provider value={{ tourType, setTourType }}>{children}</TourContext.Provider>;
};
