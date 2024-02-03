import { useContext } from "react";
import { AuthContext } from "../../src/Assets/Context";
import "./index.css";
import * as React from "react";
import { Header } from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../src/Assets/Context/firebaseContext";
import Loading from "../Loading";
import { Notifications } from "../notification/Notification";
const HireService = () => {
  const navigate = useNavigate();
  const {
    setShowNotification,
    setNotification,
    productData,
    setProductData,
    showNotification,
  } = useContext(AuthContext);

  const { Cart, setCart, user, isLoading } = useContext(FirebaseContext);
  const currentDate = new Date().toISOString().split("T")[0];
  console.log(showNotification);

  const Saving = async (id) => {
    const Exists = Cart.cars.find((prev) => prev.id === id);

    if (Exists) {
      let filll = Cart.cars.filter((data) => data.id === id);
      console.log(filll[0].id);

      setNotification((prev) => {
        return (
          <p>
            You have already <strong>Hired</strong> <b> {filll[0].name} </b> for{" "}
            <b>{filll[0].days}</b> day
            {filll[0].days > 1 ? "s" : ""}
          </p>
        );
      });

      setShowNotification(true);
    } else {
      const newOrder = Cart.cars.slice();

      newOrder.push(productData);
      const hireAmount = newOrder.reduce((prev, current) => {
        return prev + current.amount * current.days;
      }, 0);

      if (user.isLisenceAuthenticated) {
        await setCart((prev) => {
          return {
            ...prev,
            cars: newOrder,
            hireAmount: hireAmount,
            totalAmount: hireAmount + prev.bookingsAmount,
          };
        });
      } else {
        navigate("/lisenceverification");
      }

      setNotification((prev) => {
        return (
          <p>
            You Have Hired <b> {productData.name}</b> for{" "}
            <b>{productData.days}</b> day
            {productData.days > 1 ? "s" : ""} Succesfully
          </p>
        );
      });

      setShowNotification(true);
    }
  };

  const SetDays = (event) => {
    const { name, value } = event.target;

    setProductData((prev) => {
      return {
        ...prev,
        [name]: value,
        status: "Pending",
        uid: user.uid,
      };
    });
  };

  return (
    <main>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="product fade">
          <div className="header-mobile">
            <button className="rounded_button" onClick={() => navigate(-1)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="16"
                height="16"
              >
                <path d="M9.78 12.78a.75.75 0 0 1-1.06 0L4.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L6.06 8l3.72 3.72a.75.75 0 0 1 0 1.06Z"></path>
              </svg>
            </button>
            <h2>Details</h2>
            <button className="rounded_button">
              <img src="/images/Untitled (4).png" height={35} width={35} />
            </button>
          </div>
          <div className="product-body">
            <div className="product-image">
              {" "}
              <img src={productData.picture} />
            </div>

            <section className="product-content">
              <div className="car-service-data">
                <h4>Car Details</h4>
                <p>
                  Service:<span className="gray">{productData.name}</span>
                </p>
                <p>
                  Description:
                  <span className="gray">{productData.description}</span>
                </p>
                <p>Price/Day:{productData.amount}</p>
              </div>
              <div className="hire_info">
                <h4>Hire Information</h4>
                <div className="page-input">
                  {" "}
                  <label>Days:</label>
                  <select
                    value={productData.days}
                    name="days"
                    onChange={SetDays}
                  >
                    <option value={""}>Select Number Of Days</option>
                    <option value={1 * 1}>1</option>
                    <option value={2 * 1}>2</option>
                    <option value={3 * 1}>3</option>
                    <option value={4 * 1}>4</option>
                    <option value={5 * 1}>5</option>
                    <option value={6 * 1}>6</option>
                    <option value={7 * 1}>7</option>
                  </select>
                </div>
                <div className="page-input">
                  {" "}
                  <label>Drop-Point:</label>
                  <select
                    value={productData.drop_point}
                    name="drop_point"
                    onChange={SetDays}
                  >
                    <option value={""}>Select Drop Point</option>
                    <option value={"Kencom Point"}>Kencom Point</option>
                    <option value={"The Hub-Karen"}>The Hub-Karen</option>
                    <option value={"Kapsabet-The Office"}>
                      Kapsabet-The Office
                    </option>
                    <option value={"Kisumu-Office"}>Kisumu-Office</option>
                    <option value={"Eldoret-Point"}>Eldoret-Point</option>
                    <option value={"Thika Arcade"}>Thika Arcade</option>
                    <option value={"Moi University-Point"}>
                      Moi University-Point
                    </option>
                    <option value={"Eldoret-Point"}>Eldoret-Point</option>
                    <option value={"South-B"}>South-B</option>
                    <option value={"Lesoss"}>Lesoss</option>
                    <option value={"Eldoret-Point"}>Eldoret-Point</option>
                    <option value={"Nakuru-near Green Garden"}>
                      Nakuru-near Green Garden
                    </option>
                    <option value={"Hill-View"}>Hill-View</option>
                  </select>
                </div>
                <div className="page-input">
                  <label>Pick Up Date:</label>
                  <input
                    type="date"
                    name="pick_up"
                    value={productData.pick_up}
                    onChange={SetDays}
                    min={currentDate}
                  />
                </div>
              </div>
              {showNotification && <Notifications />}
              <div className="booking-content">
                <div className="product-buttons">
                  <button onClick={() => navigate(-1)} className="button">
                    Cancel
                  </button>
                  <button
                    onClick={() => Saving(productData.id)}
                    className="button"
                  >
                    HIRE
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </main>
  );
};

export { HireService };
