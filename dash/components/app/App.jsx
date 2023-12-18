
import "./App.css";

import { FirebaseProvider } from "../context/firebase";
import AppRoutes from "../approutes";
import { AppProvider } from "../context/appcontext";
function App() {
  return (
    <FirebaseProvider>
   <AppProvider>
   <AppRoutes/>
   </AppProvider>
    </FirebaseProvider>
  );
}

export default App;
