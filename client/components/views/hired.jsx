import { useContext } from "react";
import { AuthContext } from "../../src/Assets/Context";
import "./index.css";
import * as React from "react";
import { Header } from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../src/Assets/Context/firebaseContext";
import Loading from "../Loading";

const HiredView = () => {
  const navigate = useNavigate();
  const { setShowNotification, setNotification, productData, setProductData } =
    useContext(AuthContext);

  const { Cart, setCart, user, isLoading } = useContext(FirebaseContext);

  const systemDataUpdate = async () => {
    await setCart((prev) => {
      const bookingsAmount = prev.bookings.reduce((prev, current) => {
        return prev + current.toBePaid;
      }, 0);
      const hireAmount = prev.cars.reduce((prev, current) => {
        return prev + current.days * current.amount;
      }, 0);

      return {
        ...prev,
        bookingsAmount,
        hireAmount,
        totalAmount: hireAmount + bookingsAmount,
      };
    });
  };

  const DeletingFromHired = async (id) => {
    const updatedCars = Cart.cars.filter((car) => car.id !== id);

    const bookingsAmount = Cart.bookings.reduce((prev, current) => {
      return prev + current.toBePaid;
    }, 0);

    const hireAmount = updatedCars.reduce((prev, current) => {
      return prev + current.days * current.amount;
    }, 0);

    const updatedCart = {
      ...Cart,
      cars: updatedCars,
      bookingsAmount,
      hireAmount,
      totalAmount: hireAmount + bookingsAmount,
    };
    await setCart(updatedCart);

    await systemDataUpdate();
    navigate(-1);
    setNotification((prev) => {
      return (
        <p>
          You Have Removed <b> {productData.name}</b> that was hired for{" "}
          {productData.days > 1 ? "s" : ""} Succesfully
        </p>
      );
    });
    setShowNotification(true);
  };

  return (
    <main>
      {isLoading ? (
        <Loading />
      ) : (
        <div className=" product fade">
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
            <h2>Hired Car Details</h2>
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
                <h4>Hired Car Details</h4>
                <p>
                  Name: <span className="gray">{productData.name}</span>
                </p>
                <p>
                  Description:
                  <span className="gray">{productData.description}</span>
                </p>
                <p>
                  Price/Day:Ksh. {parseInt(productData.amount).toLocaleString()}
                </p>
              </div>
              <div className="ticket_info">
                <h4>Hire Details</h4>
                <div className="page-input">
                  {" "}
                  <label>Days:</label>
                  <select value={productData.days} name="days">
                    <option>{productData.days}</option>
                  </select>
                </div>
                <div className="page-input">
                  {" "}
                  <label>Drop-Point:</label>
                  <select value={productData.drop_point} name="drop_point">
                    <option value={"Hill-View"}>
                      {productData.drop_point}
                    </option>
                  </select>
                </div>
                <div className="page-input">
                  <label>Pick Up Date:</label>
                  <input
                    disabled
                    type="date"
                    name="pick_up"
                    value={productData.pick_up}
                    min={productData.date}
                    max={productData.date}
                  />
                </div>
                <div className="order-status-div">
                  <label>Status:</label>
                  <div
                    className="order-status"
                    style={{
                      color: "black",
                      background:
                        productData.status === "Pending"
                          ? "red"
                          : productData.status === "Approved"
                          ? "green"
                          : "grey",
                    }}
                  >
                    {productData.status}
                  </div>
                </div>
              </div>
              <div className="booking-content">
                <div className="product-buttons">
                  <button className="button" onClick={() => navigate(-1)}>
                    Cancel
                  </button>
                  <button
                    className="button"
                    onClick={() => DeletingFromHired(productData.id)}
                  >
                    remove
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

export { HiredView };
