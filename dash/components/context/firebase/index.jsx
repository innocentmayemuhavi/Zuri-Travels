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
  const [docToUpdate, setDocToUpdate] = useState({});
  const [docToUpdate1, setDocToUpdate1] = useState({});
  const [docId, setDocId] = useState(null);
  const [lis, setList] = useState({});
  const [list, setListt] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, async (userData) => {
      try {
        setUser(userData);

        if (userData) {
          onSnapshot(collection(database, "users"), (querySnapshot) => {
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
        }
      } catch (e) {
        setIsLoading(false);
        console.log(e);
      }
    });

    const docRef1 = doc(database, "orders", "z7zydCKkciF9gEy2IBtH");
    getDoc(docRef1).then(async (doc) => {
      setList({
        ...doc.data().cart,
      });
    });
    onSnapshot(docRef1, async (doc) => {
      setList({
        ...doc.data().cars,
      });
    });
  }, []);

  useEffect(() => {
    onSnapshot(collection(database, "users"), (querySnapshot) => {
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

        setOrders(combinedOrders);
        setListt(combinedOrders);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    });
  }, [lis]);

  const updateState = async (uid, id,type) => {
    try {
      const docRef = doc(database, "users", uid);
      onSnapshot(docRef, async (doc) => {
        const cars = doc
          .data()
          .cart.cars.map((data) =>
            data.id === id ? { ...data, status: "Approved" } : data
          );
        setDocToUpdate((prev) => {
          return {
            ...doc.data().cart,
            cars: cars,
          };
        });
      });
      setOrders((prev) => {
        return {
          ...prev,
          ...docToUpdate,
        };
      });
    } catch (e) {}

    setDocId(uid);
  };

  const updateState1 = async (uid, id) => {
    try {
      const docRef = doc(database, "users", uid);
      onSnapshot(docRef, async (doc) => {
        const bookings = doc
          .data()
          .cart.bookings.map((data) =>
            data.id === id ? { ...data, status: "Approved" } : data
          );
        setDocToUpdate1((prev) => {
          return {
            ...doc.data().cart,
            bookings: bookings,
          };
        });
      });
      setOrders((prev) => {
        return {
          ...prev,
          ...docToUpdate1,
        };
      });
    } catch (e) {}

    setDocId(uid);
  };

  const updateData = async () => {
    try {
      if (auth.currentUser.uid) {
        const docRef = doc(database, "users", docId);
        await updateDoc(docRef, {
          cart: docToUpdate,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateData1 = async () => {
    try {
      if (auth.currentUser.uid) {
        const docRef = doc(database, "users", docId);
        await updateDoc(docRef, {
          cart: docToUpdate1,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (docId) {
      // updateDoc();
      updateData();
    }
  }, [docToUpdate]);

  useEffect(() => {
    if (docId) {
      // updateDoc();
      updateData1();
    }
  }, [docToUpdate1]);

  return (
    <FirebaseContext.Provider
      value={{
        orders,
        isLoading,
        user,
        updateState,
        lis,
        list,
        setOrders,
        docToUpdate,
        docToUpdate1,
        updateState1,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider };
