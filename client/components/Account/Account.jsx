import { AuthContext } from "../../src/Assets/Context";
import { useContext, useEffect, useState } from "react";
import React from "react";
import "./index.css";
import { Button } from "../Button/Index";
import { FirebaseContext } from "../../src/Assets/Context/firebaseContext";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../utils/screensize";
import { Header } from "../Header/Header";

const Account = () => {
  const navigate = useNavigate();
  const { setShowaccount } = useContext(AuthContext);

  const {
    user,
    signout,
    Cart,
    deleteAccount,
    updateUserName,
    updateUserPassword,
    handleImage,
    uploadProgress,
    isUploading,
  } = useContext(FirebaseContext);

  const [data, setData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoadingprof, setIsLoadingprof] = useState(false);
  const [isLoadingpass, setIsLoadingpass] = useState(false);
  const [showError, setShowError] = useState(false);
  const [warning, setWarning] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [mesage, setMessage] = useState("");
  const [tap, setTap] = useState(0);
  const [photoURL, setPhotoURL] = useState(null);
  const handleData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const [showAll, setShowAll] = useState(false);
  const [showUpdateImage, setShowUpdateImage] = useState(false);

  const [history, setHistory] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const updatePassword = async (event) => {
    setIsLoadingpass(true);
    event.preventDefault();
    if (data.password.length > 5) {
      if (data.password === data.confirmPassword) {
        await updateUserPassword(data.password);
        setData({ ...data, password: "", confirmPassword: "" });
        setIsLoadingpass(false);
        setShowSuccess(true);
        setMessage("Password Updated Successfully");
      } else {
        setShowError(true);
        setWarning("Password does not match");
        setIsLoadingpass(false);
      }
    } else {
      setIsLoadingpass(false);
      setShowError(true);
      setWarning("Password must be at least 6 characters");
    }
  };

  const updateProfile = async (event) => {
    event.preventDefault();
    setIsLoadingprof(true);
    if (data.name) {
      await updateUserName(data.name);
      setShowSuccess(true);
      setMessage("Profile Updated Successfully");
      setIsLoadingprof(false);
      setData({ ...data, name: "" });
    } else {
      setIsLoadingprof(false);
      alert("Name cannot be empty");
    }
  };

  useEffect(() => {
    if (user.history) {
      setHistory(user.history);
      console.log("history is:", user.history);
    }
    setPhotoURL(user.photoURL);
  }, [user]);

  const renderHistory = (showAll ? history : history.slice(0, 5)).map(
    (item, index) => (
      <p key={index}>
        {index + 1} . {item.data}
      </p>
    )
  );
  useEffect(() => {
    setTimeout(() => {
      setShowError(false);
    }, 2000);
  }, [warning, showError]);

  useEffect(() => {
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  }, [showSuccess, mesage]);
  const size = useScreenSize();

  return (
    <main className="fade">
      {size.width > 1200 ? (
        <Header />
      ) : (
        <div className="header-mobile">
          <div className="back" onClick={() => navigate(-1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="18"
              height="18"
            >
              <path d="M9.78 12.78a.75.75 0 0 1-1.06 0L4.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L6.06 8l3.72 3.72a.75.75 0 0 1 0 1.06Z"></path>
            </svg>
            Back
          </div>
          <h2>Account</h2>
          <div className="cart_avatar" onClick={() => navigate("/mycars")}>
            <img src="/images/Untitled.png" height={35} width={35} />
          </div>
        </div>
      )}
      <div className="product-body">
        <div>
          <div className="account_info">
            <div>
              <h4 className="form-label">Account Information</h4>
            </div>

            <div className="avatar">
              {isUploading ? (
                <p>{Math.round(uploadProgress)} %</p>
              ) : !showUpdateImage && user.photoURL ? (
                <img src={user.photoURL} />
              ) : selectedImage ? (
                <button
                  className="button"
                  onClick={() => {
                    setShowUpdateImage((prev) => !prev);
                    handleImage(selectedImage);
                  }}
                >
                  Upload
                </button>
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
              )}
            </div>
            {!showUpdateImage && (
              <div className="update_image">
                {" "}
                <button
                  className="button"
                  onClick={() => setShowUpdateImage((prev) => !prev)}
                >
                  Update Image
                </button>
              </div>
            )}
            <div>
              <div className="account_details">
                <p>
                  Name: <span className="gray">{user.displayName}.</span>
                </p>
              </div>
              <div className="account_details">
                <p>
                  Email: <span className="gray">{user.email}.</span>
                </p>
              </div>
            </div>
          </div>
          <form className="account_info " onSubmit={updateProfile}>
            <div className="form-label">
              <h3>Update Account Information</h3>
            </div>
            <div className="page-input">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                value={data.name}
                placeholder={user.displayName}
                required
                onChange={(e) => handleData(e)}
              />
            </div>
            <div className="page-input">
              <label htmlFor="email">Email:</label>
              <input
                disabled
                type="email"
                name="email"
                placeholder={user.email}
                required
                onChange={(e) => handleData(e)}
              />
            </div>

            <button className="button">
              {isLoadingprof ? "Please Wait..." : "Update Profie"}
            </button>
          </form>
        </div>

        <form className="account_info update_pass" onSubmit={updatePassword}>
          <div>
            <h4 className="form-label">Update Pasword</h4>
          </div>
          <div className="form-label warning">
            {showError && <p>{warning}</p>}
          </div>

          <div className="page-input">
            <label htmlFor="password">Password:</label>
            <input
              value={data.password}
              type="password"
              onChange={(e) => handleData(e)}
              name="password"
              required
              autoComplete="off"
              placeholder="Enter New Password"
            />
          </div>
          <div className="page-input">
            <label htmlFor="Confirm password">Confirm:</label>
            <input
              value={data.confirmPassword}
              autoComplete="off"
              type="password"
              onChange={(e) => handleData(e)}
              name="confirmPassword"
              required
              placeholder="Confirm Password"
            />
          </div>

          <button className="button">
            {isLoadingpass ? "Please Wait" : "Update Pasword"}
          </button>
        </form>
        <div className="account_info">
          <div>
            <h4 className="form-label">Account Activities</h4>
          </div>
          <div className="div_header">
            <p onClick={() => setShowAll((prev) => !prev)}>
              View {showAll ? "Less" : "All"}
            </p>
          </div>
          <div>
            <div>{renderHistory}</div>
          </div>
        </div>
        <div className="">
          <button className="button" onClick={async () => await signout()}>
            Log Out
          </button>
          <button
            className={`button  ${tap > 0 && "warning_button"}  red_hover `}
            onClick={() => {
              if (tap > 0) {
                deleteAccount();
              } else {
                setTap((prev) => prev + 1);
              }
            }}
          >
            {tap > 0 ? "Proceed?" : "Delete Account"}
          </button>
        </div>
      </div>
      {showSuccess && (
        <div className="success">
          <p>{mesage}</p>
        </div>
      )}
    </main>
  );
};

export { Account };
