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
  const [showModal, setShowModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [modalData, setModalData] = useState({});

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

  useEffect(() => {
    const savedData =
      localStorage.getItem("payData") === null
        ? {}
        : JSON.parse(localStorage.getItem("payData"));
    setModalData(savedData);
  }, []);

  useEffect(() => {
    if (modalData) {
      localStorage.setItem("payData", JSON.stringify(modalData));
    }
  }, [modalData]);

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
        showModal,
        setShowModal,
        showPayModal,
        setShowPayModal,
        modalData,
        setModalData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
