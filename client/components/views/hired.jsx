import { useContext } from "react";
import { AuthContext } from "../../src/Assets/Context";
import "./index.css";
import * as React from "react";
import { Header } from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../src/Assets/Context/firebaseContext";
import Loading from "../Loading";
import ServiceData from "../SystemData/ServiceData";
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
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className=" product fade">
          <Header />
          <div className="product-body">
            <div className="product-image">
              {" "}
              <img src={productData.picture} />
            </div>

            <section className="product-content">
              <div className="booking-content">
                <p>
                  Service:<span className="gray">{productData.name}</span>
                </p>
                <p>
                  Description:
                  <span className="gray">{productData.description}</span>
                </p>
                <p>Price/Day:{productData.amount}</p>
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
                <div className="product-buttons">
                  <button onClick={() => navigate(-1)}>Cancel</button>
                  <button onClick={() => DeletingFromHired(productData.id)}>
                    remove
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export { HiredView };
