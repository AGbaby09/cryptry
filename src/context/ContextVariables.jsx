import { createContext, useEffect, useState } from "react";

const ContextVariables = createContext({});

export const ContextVariablesProvider = ({ children }) => {
  const domain = "http://localhost:2023/api/v1";
  const [toggleMode, setToggleMode] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [hideContact, setHideContact] = useState(false);

  return (
    <ContextVariables.Provider
      value={{
        domain,
        toggleMode,
        setToggleMode,
        hideNav,
        setHideNav,
        hideContact,
        setHideContact,
      }}
    >
      {children}
    </ContextVariables.Provider>
  );
};

export default ContextVariables;