import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashBoard } from "../dashboad";
import { Orders } from "../orders";
import AddingCars from "../addcar";
import { VehecleManagement } from "../vehiclemanagement";
import { useContext } from "react";
import { FirebaseContext } from "../context/firebase";
import { useEffect } from "react";

const AppRoutes = () => {
  const { signin } = useContext(FirebaseContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard />}></Route>
        <Route path="/orders" element={<Orders />} />
        <Route path="/addcars" element={<AddingCars />} />
        <Route path="/vehiclemanagement" element={<VehecleManagement />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
