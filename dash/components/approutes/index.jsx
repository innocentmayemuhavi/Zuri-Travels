import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashBoard } from "../dashboad";
import { Orders } from "../orders";
import AddingCars from "../addcar";
import { VehecleManagement } from "../vehiclemanagement";

const AppRoutes = () => {
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
