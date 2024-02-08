import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../src/Assets/Context";
import { Notifications } from "../notification/Notification";

import "./index.css";
import { FirebaseContext } from "../../src/Assets/Context/firebaseContext";

const BookedView = () => {
  const {
    serviceData,
    setServiceData,
    setNotification,
    setShowNotification,

    showNotification,
  } = useContext(AuthContext);

  const { Cart, setCart } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const updatedata = (event, data) => {
    const { name, value } = event.target;

    if (data.to === value) {
      console.log("invalid");
    } else {
      if (data.from === value) {
        console.log("invalid");
      } else {
        setServiceData((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      }
    }
  };
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
  const DeletingFromBooking = async (id) => {
    const fill = Cart.bookings.filter((cars) => cars.id !== id);
    await setCart((prev) => {
      return {
        cars: prev.cars,
        bookings: fill,
        bookingsAmount: fill.reduce((prev, current) => {
          return prev + current.toBePaid;
        }, 0),
        hireAmount: prev.cars.reduce((prev, current) => {
          return prev + current.days * current.amount;
        }, 0),
        totalAmount: prev.hireAmount + prev.bookingsAmount,
      };
    });

    await systemDataUpdate();
    setNotification((prev) => {
      return (
        <p>
          You have Successfully <strong>Removed</strong>{" "}
          <b> {serviceData.name} </b> scheduled for <b>{serviceData.time}</b>
        </p>
      );
    });
    setShowNotification(true);

    navigate(-1);
  };


  return (
    <main>
      {showNotification && <Notifications />}
      <div className="product">
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
          <h2>Ticket</h2>
          <div className="cart_avatar" onClick={() => navigate("/mycars")}>
          <img src="images/carticon.png" height={35} width={35} />
        </div>
        </div>
        <div className="service-page-section">
          <div className="product-image">
            {" "}
            <img src={serviceData.picture} />
          </div>
          <div className="service-page-data">
            <div className="car-service-data">
              <div>
                <h4>Ticket Details</h4>
                <p>
                  Car Name: <span>{serviceData.name}</span>
                </p>

                <p>
                  Booking cost: Ksh.{" "}
                  <span>{parseInt(serviceData.price).toLocaleString()}</span>
                </p>
                <p>
                  Discount: <span>{serviceData.offer} %</span>
                </p>
                <p>
                  New booking cost: Ksh.{" "}
                  <span>
                    {Math.round(
                      serviceData.cost -
                        serviceData.cost * (serviceData.offer * 0.01)
                    ).toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
            <div className="ticket_info">
              <h4>Booking data</h4>
              <div className="page-input">
                <label>From:</label>
                <select value={serviceData.from} name="from">
                  <option>{serviceData.from}</option>
                </select>
              </div>

              <div className="page-input">
                <label>To:</label>
                <select value={serviceData.to} name="to">
                  <option>{serviceData.to}</option>
                </select>
              </div>
              <div className="page-input">
                <label>Seat:</label>
                <select value={serviceData.seat} name="seat">
                  <option>{serviceData.seat}</option>
                </select>
              </div>
              <div className="page-input">
                <label>Time:</label>
                <select value={serviceData.time} name="time">
                  <option>
                    {serviceData.time} {serviceData.trip}
                  </option>
                </select>
              </div>
              <div className="order-status-div">
                <label>Status:</label>
                <div
                  className="order-status"
                  style={{
                    color: "black",
                    background:
                      serviceData.status === "Pending"
                        ? "red"
                        : serviceData.status === "Approved"
                        ? "green"
                        : "grey",
                  }}
                >
                  {serviceData.status}
                </div>
              </div>
            </div>
            <div className="book-btn">
              <button onClick={() => navigate(-1)} className="button">
                back
              </button>
              <button
                onClick={() => DeletingFromBooking(serviceData.id)}
                className="button"
              >
                Remove
              </button>
            </div>
          </div>
          <div className="card_footer"></div>
        </div>
      </div>
    </main>
  );
};

export default BookedView;
