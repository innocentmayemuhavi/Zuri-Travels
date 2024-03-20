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
  updateCurrentUser,
} from "firebase/auth";
import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { Timestamp } from "firebase/firestore";

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
const mediaDb = getStorage(app);
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
  const [cars, setCars] = useState([]);
  const [warning, setWarning] = useState("");
  const [transactions, setTransactions] = useState([]);

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
            } catch (error) {}
          });
        }

        const transactionsDocRef = doc(
          database,
          "payments",
          "h29L3i4InvZCuq55gsPY"
        );
        getDoc(transactionsDocRef).then(async (doc) => {
          setTransactions([...doc.data().data]);
        });
        onSnapshot(transactionsDocRef, async (doc) => {
          setTransactions([...doc.data().data]);
        });

        const carDocRef = doc(database, "cars", "sKbnRVOUTouZUUCG8g9F");
        getDoc(carDocRef).then(async (doc) => {
          setCars({
            ...doc.data().cars,
          });
        });
        onSnapshot(carDocRef, async (doc) => {
          setCars({
            ...doc.data().cars,
          });
        });

        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    });

    const carDocRef = doc(database, "cars", "sKbnRVOUTouZUUCG8g9F");
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
      } catch (error) {}
    });
  }, [user]);

  const updateState = async (uid, id, type) => {
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

  const updateTransaction = async (uid, id, code,timestamp) => {
    try {
      const docRef = doc(database, "payments", "h29L3i4InvZCuq55gsPY");
      const userDocRef = doc(database, "users", uid);
      console.log("updating transaction", id);

      onSnapshot(docRef, async (doc) => {
        const data = doc.data().data.map((data) =>
          data.id === id
            ? {
                ...data,
                status: "Completed",
                code: code,
                timestamp: timestamp,
              }
            : data
        );

        await updateDoc(docRef, {
          data: data,
        });
      });
      updateDoc(userDocRef, {
        cart: {
          cars: [],
          bookings: [],
          hireAmount: 0,
          bookingsAmount: 0,
          totalAmount: 0,
        },
      });
    } catch (e) {
      console.log("errer", e);
    }
  };
  const editCar = async (id, data) => {
    const carDocRef = doc(database, "cars", "sKbnRVOUTouZUUCG8g9F");
    getDoc(carDocRef).then(async (doc) => {
      const cars = Object.values(doc.data().cars).map((car) => {
        return car.id === id ? data : car;
      });
      setCars({
        ...cars,
      });
    });
  };

  const signin = async (email, password) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: "Admin",
      });

      console.log("signed in");
      setWarning("");
      setIsLoading(false);
    } catch (error) {
      if (error.code) {
        const w1 = error.code.split("auth/").join("");
        const w2 = w1.split("-").join(" ");
        setWarning(w2);
        setIsLoading(false);
      }
      console.log(error);
    }
  };
  const signup = async (email, password, name, phone) => {
    try {
      setIsLoading(true);

      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: name,
        phoneNumber: phone, // Add phone number here
      });

      if (userData) {
        const isNewUser = getAdditionalUserInfo(userData).isNewUser;

        if (isNewUser) {
          await setDoc(doc(database, "admins", userData.user.uid), {
            history: [],
            role: "admin",
          });
        }
      }
      setWarning("");
      setIsLoading(false);
    } catch (e) {
      if (e.code) {
        const w1 = e.code.split("auth/").join("");
        const w2 = w1.split("-").join(" ");
        setWarning(w2);
      }
      setIsLoading(false);
    }
  };
  const signout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      setUser(null);
      setIsLoading(false);
    } catch (e) {
      console.log(e.code);
      setIsLoading(false);
    }
  };

  const resetpassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      const w1 = error.code.split("auth/").join("");
      const w2 = w1.split("-").join(" ");
      setWarning(w2);
    }
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
  const clearUserCart = async (id) => {
    try {
      if (auth.currentUser.uid) {
        const docRef = doc(database, "users", docId);
        await updateDoc(docRef, {
          cart: {
            cars: [],
            bookings: [],
            hireAmount: 0,
            bookingsAmount: 0,
            totalAmount: 0,
          },
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

  const uploadCar = async () => {
    try {
      if (Object.values(cars).length > 1) {
        const docRef1 = doc(database, "cars", "sKbnRVOUTouZUUCG8g9F");

        await updateDoc(docRef1, {
          cars: cars,
        });
        console.log("added car");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    uploadCar();
  }, [cars]);

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
        cars,
        ref,
        mediaDb,
        uploadBytesResumable,
        getDownloadURL,
        setCars,
        signin,
        signup,
        signout,
        resetpassword,
        warning,
        setWarning,
        editCar,
        transactions,
        setTransactions,
        updateTransaction,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider };
