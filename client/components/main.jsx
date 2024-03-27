import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import React from "react";
import { FirebaseProvider } from "../src/Assets/Context/firebaseContext";
const rootElement = document.getElementById("root");
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/serviceWorker.js")
    .then((reg) => console.log("service worker registered"))
    .catch((err) => console.log("service worker not registered", err));
}


const root = createRoot(rootElement);
const Main = () => {
  return (
    <>
      <App />
    </>
  );
};
root.render(
  <>
    <FirebaseProvider>
      <Main />
    </FirebaseProvider>
  </>
);
