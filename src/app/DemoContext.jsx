import React, { createContext } from "react";
import { useSelector } from "react-redux";
import { reduxState } from "../services/redux/reduxState";

const DemoContext = createContext();

const DemoContextProvider = ({ children }) => {
 
  const { isDemo } = useSelector((state) => state[reduxState.USER_PROFILE]);

  return (
    <DemoContext.Provider value={isDemo}>
      {children}
    </DemoContext.Provider>
  );
};

export { DemoContext, DemoContextProvider };