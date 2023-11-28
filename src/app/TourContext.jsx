import React, { createContext, useContext, useState } from 'react';

// Step 1: Create the tour context
const TourContext = createContext({
  shouldStart: false,
  tourType: 'default',
  setTourState: (state) => {},
});

// Step 2: Create a Tour Provider
export const TourProvider = ({ children }) => {
  const [tourState, setTourState] = useState({
    shouldStart: false,
    tourType: 'default',
  });

  return (
    <TourContext.Provider value={{ ...tourState, setTourState }}>
      {children}
    </TourContext.Provider>
  );
};

// Custom hook to use tour context
export const useTour = () => useContext(TourContext);