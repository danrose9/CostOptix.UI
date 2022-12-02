import React, { createContext } from "react";
import { useSelector } from "react-redux";
import { reduxState } from "../services/redux/reduxState";


const ApplicationContext = createContext();

const ApplicationContextProvider = ({ children }) => {
 
  const application = useSelector(
    (state) => state[reduxState.APPLICATION]
  );

  return (

    <ApplicationContext.Provider value={application}>
      {children}
    </ApplicationContext.Provider>
  );
};

export { ApplicationContext, ApplicationContextProvider };