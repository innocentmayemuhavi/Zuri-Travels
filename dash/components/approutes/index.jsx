import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashBoard } from "../dashboad";
import { Orders } from "../orders";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard />}></Route>
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
