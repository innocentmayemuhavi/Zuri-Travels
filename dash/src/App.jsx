import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { DashBoard } from "../components/dashboad";
import { FirebaseProvider } from "../components/context/firebase";
function App() {
  

  return (
    <FirebaseProvider>
      <DashBoard />
    </FirebaseProvider>
  );
}

export default App;
