import { FirebaseContext } from "../context/firebase";
import { Header } from "../header";
import { Loader } from "../loading";
import { useContext } from "react";
import { CarCard } from "../cards";
import "./index.css";
import { AppContext } from "../context/appcontext";
import { WarningModal } from "../notification/warnig";
import { Notifications } from "../notification";
const VehecleManagement = () => {
  const { isLoading, cars } = useContext(FirebaseContext);
  const { showModal, setShowModal, showNotification } = useContext(AppContext);

  console.log(Object.values(cars));

  const render = Object.values(cars).map((data, index) => (
    <CarCard {...data} key={index} />
  ));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main className="main">
          <Header />
          <div>Vehicle Management</div>
          <div className="cars-grid">{render}</div>
          {showModal && <WarningModal />}
          {showNotification && <Notifications />}
        </main>
      )}
    </>
  );
};

export { VehecleManagement };
