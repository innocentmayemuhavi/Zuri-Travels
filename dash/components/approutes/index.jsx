import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
} from "react-router-dom";
import { DashBoard } from "../dashboad";
import { Orders } from "../orders";
import AddingCars from "../addcar";
import { VehecleManagement } from "../vehiclemanagement";
import { useContext } from "react";
import { FirebaseContext } from "../context/firebase";
import { useEffect } from "react";
import { Loader } from "../loading";
import Login from "../auth/login";
import { SignUp } from "../auth/signup";
import { CarEdit } from "../caredit";

const ProtectedRoutes = () => {
  const { user, isLoading } = useContext(FirebaseContext);

  return isLoading ? (
    <Loader />
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

const AppRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<DashBoard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/addcars" element={<AddingCars />} />
        <Route path="/vehiclemanagement" element={<VehecleManagement />} />
        <Route path="caredit" element={<CarEdit />} />
      </Route>
      <Route path="*" element={<div>Page Not Found</div>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </>
  )
);
// () => {
//   const { signin } = useContext(FirebaseContext);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<DashBoard />}></Route>
//         <Route path="/orders" element={<Orders />} />
//         <Route path="/addcars" element={<AddingCars />} />
//         <Route path="/vehiclemanagement" element={<VehecleManagement />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

export default AppRoutes;
