import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext({
  showNav: false,
  setShowNav: () => {},
});

const AppProvider = ({ children }) => {
  const [showNav, setShowNav] = useState(false);

  const [carData, setCarData] = useState({});
  const [Notification, setNotification] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const savedData =
      localStorage.getItem("cardata") === null
        ? {}
        : JSON.parse(localStorage.getItem("cardata"));
    setCarData(savedData);
  }, []);

  useEffect(() => {
    if (carData) {
      localStorage.setItem("cardata", JSON.stringify(carData));
    }
  }, [carData]);

  return (
    <AppContext.Provider
      value={{
        showNav,
        setShowNav,
        carData,
        setCarData,
        Notification,
        setNotification,
        setShowNotification,
        showNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
