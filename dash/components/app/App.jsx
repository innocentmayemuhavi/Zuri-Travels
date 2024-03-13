
import "./App.css";

import { FirebaseProvider } from "../context/firebase";
import AppRoutes from "../approutes";
import { AppProvider } from "../context/appcontext";
import { RouterProvider } from "react-router-dom";
function App() {
  return (
    <FirebaseProvider>
   <AppProvider>
  <RouterProvider router={AppRoutes}  fallbackElement={<div>Fal</div>}/>
   </AppProvider>
    </FirebaseProvider>
  );
}

export default App;
