import { createContext, useContext, useEffect, useState } from "react";

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
  updatePassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);
const database = getFirestore();

const auth = getAuth();
const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [warning, setWarning] = useState("");
  const [profile, setProfile] = useState({
    displayName: "",
    phoneNumber: "",
  });
  const [Cart, setCart] = useState({
    cars: [],
    bookings: [],
    hireAmount: 0,
    bookingsAmount: 0,
    totalAmount: 0,
  });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (userData) => {
      try {
        setUser(userData);
        userData.getIdToken().then((idToken) => {
          setUser((prev) => {
            return { ...prev, token: idToken };
          });
        });
        const docRef1 = doc(database, "cars", "sKbnRVOUTouZUUCG8g9F");

        if (userData) {
          const docref = doc(database, "users", auth.currentUser.uid);

          getDoc(docref).then(async (doc) => {
            setCart({
              ...doc.data().cart,
            });

            setUser((prev) => {
              return {
                ...prev,
                phone: doc.data().userdata.phoneNumber,
                lisence: doc.data().userdata.lisence,
                history: doc.data().history,
                isLisenceAuthenticated:
                  doc.data().userdata.isLisenceAuthenticated,
              };
            });
          });
          onSnapshot(docref, async (doc) => {
            setCart({
              ...doc.data().cart,
            });
            setUser((prev) => {
              return {
                ...prev,
                history: doc.data().history,
                ...doc.data.userdata,
              };
            });
          });
        }

        getDoc(docRef1).then(async (doc) => {
          setCars({
            ...doc.data().cars,
          });
        });
        onSnapshot(docRef1, async (doc) => {
          setCars({
            ...doc.data().cars,
          });
        });
        const docRef3 = doc(database, "payments", "h29L3i4InvZCuq55gsPY");
        let data = [];

        onSnapshot(docRef3, async (doc) => {
          setTransactions(doc.data().data);
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    });
  }, []);
  const signin = async (email, password) => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setWarning("");
      setIsLoading(false);
    } catch (e) {
      const w1 = e.code.split("auth/").join("");
      const w2 = w1.split("-").join(" ");
      setWarning(w2);
      setIsLoading(false);
    }
  };

  const updateData = async () => {
    try {
      if (auth.currentUser.uid) {
        const docRef = doc(database, "users", auth.currentUser.uid);
        const docRef1 = doc(database, "orders", "z7zydCKkciF9gEy2IBtH");
        await updateDoc(docRef, {
          cart: Cart,
        });
        await updateDoc(docRef1, {
          orders: [
            {
              user: {
                name: user.displayName,
                id: auth.currentUser.uid,
              },
              orders: {
                ...Cart,
              },
            },
          ],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const uploadCar = async () => {
    try {
      if (Object.values(cars).length > 1) {
        const docRef1 = doc(database, "cars", "sKbnRVOUTouZUUCG8g9F");

        await updateDoc(docRef1, {
          cars: cars,
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    uploadCar();
  }, [cars]);

  const updateUser = async (userData) => {
    const uid = auth.currentUser.uid;
    try {
      const docRef = doc(database, "users", uid);
      const data = userData;
      await updateDoc(docRef, {
        userdata: {
          phoneNumber: user.phone,
          lisence: {
            email: data.email,
            id: data.id,
            license_number: data.license_number,
            exp_date: data.exp_date,
            category: data.category,
          },
          isLisenceAuthenticated: true,
        },
      });
      setUser((prev) => {
        return {
          ...prev,
          lisence: {
            email: data.email,
            id: data.id,
            license_number: data.license_number,
            exp_date: data.exp_date,
            category: data.category,
          },
          isLisenceAuthenticated: true,
        };
      });
      console.log("Database user data updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateHistory = async (data) => {
    const uid = auth.currentUser.uid;

    try {
      const docRef = doc(database, "users", uid);

      await updateDoc(docRef, {
        history: data,
      });
      setUser((prev) => {
        return {
          ...prev,
          history: data,
        };
      });

      console.log("History data updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateData();
  }, [Cart]);

  const signup = async (email, password, name, phone) => {
    try {
      setIsLoading(true);
      setProfile({
        displayName: name,
        phoneNumber: phone,
      });
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      if (userData) {
        const isNewUser = getAdditionalUserInfo(userData).isNewUser;

        if (isNewUser) {
          await setDoc(doc(database, "users", userData.user.uid), {
            userdata: {
              phoneNumber: phone,
              lisence: {},
              isLisenceAuthenticated: false,
            },
            history: [],
            cart: {
              cars: [],
              bookings: [],
              hireAmount: 0,
              bookingsAmount: 0,
              totalAmount: 0,
            },
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
      await setCart({
        cars: [],
        bookings: [],
        hireAmount: 0,
        bookingsAmount: 0,
        totalAmount: 0,
      });
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
  const deleteAccount = async () => {
    try {
      const usertodelete = await auth.currentUser;

      const docref = doc(database, "users", usertodelete.uid);
      await deleteDoc(docref);
      await deleteUser(usertodelete);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserName = async (name) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      setUser((prev) => {
        return {
          ...prev,
          displayName: name,
        };
      });
    } catch (error) {}
  };

  const updateUserPassword = async (password) => {
    try {
      await updatePassword(auth.currentUser, password);
    } catch (error) {}
  };

  const updateUserImage = async (url) => {
    await updateProfile(auth.currentUser, {
      photoURL: url,
    });

    setUser((prev) => {
      return {
        ...prev,
        ...auth.currentUser,
      };
    });
    setIsUploading(false);
    setUploadProgress(0);
  };

  const handleImage = async (data) => {
    setIsUploading(true);
    const imgref = ref(mediaDb, `images/${user.uid}`);

    const upload_pic = uploadBytesResumable(imgref, data);

    upload_pic.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(upload_pic.snapshot.ref).then((imageUrl) => {
          console.log("File available at", imageUrl);
          updateUserImage(imageUrl);
        });
      }
    );
  };

  const updateTransaction = async (reqData) => {
    console.log(transactions);
    const newData = transactions;
    newData.unshift(reqData);
    const docRef = doc(database, "payments", "h29L3i4InvZCuq55gsPY");

    try {
      await updateDoc(docRef, {
        data: newData,
      });
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        signin,
        signup,
        user,
        profile,
        signout,
        warning,
        setWarning,
        Cart,
        setCart,
        setUser,
        updateUser,
        resetpassword,
        deleteAccount,
        cars,
        ref,
        mediaDb,
        uploadBytesResumable,
        getDownloadURL,
        setCars,
        isLoading,
        updateUserName,
        updateUserPassword,
        updateHistory,
        handleImage,
        uploadProgress,
        isUploading,
        updateTransaction,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider };
