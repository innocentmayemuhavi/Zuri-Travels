import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/appcontext";
import { FirebaseContext } from "../context/firebase";
import "./index.css";
import * as React from "react";
import { Loader } from "../loading";
import { Header } from "../header";
import { useState } from "react";
import { nanoid } from "nanoid";
import { Notifications } from "../notification";
// import { Header } from "../Header/Header";
// import { useNavigate } from "react-router-dom";
// import { FirebaseContext } from "../../src/Assets/Context/firebaseContext";

// import { Notifications } from "../notification/Notification";
const CarEdit = () => {
  const navigate = useNavigate();
  const { carData, setCarData, setNotification, setShowNotification ,showNotification} =
    useContext(AppContext);
  const {
    isLoading,
    ref,
    mediaDb,
    uploadBytesResumable,
    getDownloadURL,
    editCar,
  } = useContext(FirebaseContext);
  const [showProgress, setShowProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showEdit, setShowEdit] = useState(false);
  const currentDate = new Date().toISOString().split("T")[0];
  const [loading, setloading] = useState(false);

  const Saving = async () => {};

  const handleData = (event) => {
    const { name, value } = event.target;
    setCarData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  console.log(carData);
  const handlePostImage = async (data) => {
    const imgref = ref(mediaDb, `images/${carData.id}`);
    const upload_pic = uploadBytesResumable(imgref, data);

    upload_pic.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setShowProgress(true);
        setUploadProgress(Math.floor(progress));
      },
      (error) => {
        console.log(error.code);
      },
      () => {
        setShowProgress(false);
        setUploadProgress(0);
        setShowEdit(false);
        getDownloadURL(upload_pic.snapshot.ref).then((imageUrl) => {
          console.log("File available at", imageUrl);
          setCarData((prev) => {
            return {
              ...prev,
              picture: imageUrl,
            };
          });
        });
      }
    );
  };

  console.log(showNotification)
  return isLoading ? (
    <Loader />
  ) : (
    <main className="fade">
      <Header />

      <div className="product-body">
        <div className="product-image  edit_image_div">
          <div className="edit_pic">
            {showEdit ? (
              showProgress ? (
                <p>{uploadProgress} % uploaded</p>
              ) : (
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  name="picture"
                  placeholder="Upload Image"
                  className="button"
                  onChange={async (event) => {
                    console.log(event.target.files[0]);
                    await handlePostImage(event.target.files[0]);
                  }}
                />
              )
            ) : (
              <button className="button" onClick={() => setShowEdit(!showEdit)}>
                Edit Pic
              </button>
            )}
          </div>{" "}
          <img src={carData.picture} />
        </div>
        <div className="booking_info">
          <h4>Car Info</h4>
          <div className="page-input1">
            <label>Car Name</label>
            <input
              name="name"
              type="text"
              value={carData.name}
              onChange={(event) => handleData(event)}
            ></input>
          </div>
          <label>Car Description:</label>
          <div className="page-input1">
            <textarea
              type={"text"}
              placeholder="Description"
              required={true}
              className="text_area"
              name="description"
              value={carData.description}
              onChange={handleData}
            />
          </div>
          <div className="form-split">
            <div className="page-input1">
              <label>Price:</label>
              <input
                type={"number"}
                placeholder="Price"
                required={true}
                name="price"
                value={carData.price}
                onChange={(event) => handleData(event)}
                // onChange={handleData}
              />
            </div>
            <div className="page-input1">
              <label>Discount (%):</label>
              <input
                type={"number"}
                placeholder="Discount"
                required={true}
                name="offer"
                value={carData.offer}
                onChange={(event) => handleData(event)}
              />
            </div>
          </div>
          <div className="form-split">
            <div className="page-input1">
              <label>Category:</label>
              <select
                name="category"
                value={carData.category}
                onChange={(event) => handleData(event)}
              >
                <option>coach</option>
                <option>SUV</option>
                <option>bike</option>
                <option>vintage</option>
                <option>van</option>
                <option>transist</option>
                <option>caravan</option>
                <option>cab</option>
              </select>
            </div>
            {carData.category === "coach" && (
              <div className="page-input1">
                <label>Trips:</label>
                <select
                  name="trips"
                  value={carData.trips}
                  onChange={(event) => handleData(event)}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
            )}
          </div>
        </div>
        <div>
          <button className="button" onClick={() => navigate(-1)}>
            Back
          </button>
          <button
            className="button"
            onClick={async () => {
              setloading(true);
              await editCar(carData.id, carData);
              setloading(false);
              setNotification((prev) => (
                <p>
                  You Have <strong>Edited</strong> <b> {carData.name} </b>
                  successfully
                </p>
              ));

              setShowNotification(true);

            }}
          >
            {loading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="25"
                height="25"
                className="rotate"
              >
                <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-1.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm5.657-8.157a.75.75 0 0 1 0 1.061l-1.061 1.06a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734l1.06-1.06a.75.75 0 0 1 1.06 0Zm-9.193 9.193a.75.75 0 0 1 0 1.06l-1.06 1.061a.75.75 0 1 1-1.061-1.06l1.06-1.061a.75.75 0 0 1 1.061 0ZM8 0a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 8 0ZM3 8a.75.75 0 0 1-.75.75H.75a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 3 8Zm13 0a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 16 8Zm-8 5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 13Zm3.536-1.464a.75.75 0 0 1 1.06 0l1.061 1.06a.75.75 0 0 1-1.06 1.061l-1.061-1.06a.75.75 0 0 1 0-1.061ZM2.343 2.343a.75.75 0 0 1 1.061 0l1.06 1.061a.751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018l-1.06-1.06a.75.75 0 0 1 0-1.06Z"></path>
              </svg>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
      {showNotification&&<Notifications/>}
    </main>
  );
};

export { CarEdit };
