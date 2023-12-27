import { FirebaseContext } from "../context/firebase";
import { Header } from "../header";
import { Loader } from "../loading";
import { useContext } from "react";
import { CarCard } from "../cards";
import './index.css'
const VehecleManagement = () => {
  const { isLoading, cars } = useContext(FirebaseContext);

  console.log(Object.values(cars));

  const render= Object.values(cars).map((data,index)=><CarCard  {...data} key={index}/>)

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div>Vehicle Management</div>
          <div className="cars-grid">{render}</div>
        </>
      )}
    </>
  );
};

export { VehecleManagement };
