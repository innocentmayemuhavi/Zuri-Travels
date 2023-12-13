import { createContext, useContext, useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKKDgFMvxvI6PogJBEoUUaJpEWVRVdv5Q",
  authDomain: "superpass-fdeeb.firebaseapp.com",
  databaseURL: "https://superpass-fdeeb-default-rtdb.firebaseio.com",
  projectId: "superpass-fdeeb",
  storageBucket: "superpass-fdeeb.appspot.com",
  messagingSenderId: "648988901889",
  appId: "1:648988901889:web:f24a9a0a703a693f627600",
  measurementId: "G-H5K80682K8",
};
const app = initializeApp(firebaseConfig);
// const mediaDb = getStorage(app);
// const analytics = getAnalytics(app);
const database = getFirestore();

const auth = getAuth();

const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      await onSnapshot(collection(database, "users"), async (querySnapshot) => {
        try {
          const sortedDocs = querySnapshot.docs.sort(
            (docA, docB) => docB.data().timestamp - docA.data().timestamp
          );
          const combinedOrders = sortedDocs.map((doc) => {
            const docData = doc.data();
            return {
              bucket: docData.cart,
              userData: docData.userdata,
            };
          });

          setOrders(combinedOrders);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      });
    };

    getData();
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        orders,
        isLoading,
        user,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider };
