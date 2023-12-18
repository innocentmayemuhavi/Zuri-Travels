import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext({
  showNav: false,
  setShowNav: () => {},
});

const AppProvider = ({ children }) => {
  const [showNav, setShowNav] = useState(false);

  return <AppContext.Provider value={{showNav,setShowNav}}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
