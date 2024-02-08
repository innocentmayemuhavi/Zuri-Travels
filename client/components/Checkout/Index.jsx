import { useContext, useState, useEffect } from "react";

import { Header } from "../Header/Header";
import "./index.css";
import { Pay_By_Card } from "./Pay_by_card";
import { Pay_By_Mpesa } from "./Pay_by_m_pesa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../src/Assets/Context";
import Loading from "../Loading";
import { FirebaseContext } from "../../src/Assets/Context/firebaseContext";
import CreditCard from "../credit";
const Checkout = () => {
  const [showvisa, setshowvisa] = useState(true);
  const { isLoading, setisLoading, setProductData, setServiceData } =
    useContext(AuthContext);
  const { user, Cart } = useContext(FirebaseContext);
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  const renderbooking = Cart.bookings.map((data) => {
    return (
      <tr key={data.id}>
        <td>
          <img className="order-picture" src={data.picture}></img>
        </td>
        <td>
          <Link to={"/bookedview"} onClick={() => setServiceData({ ...data })}>
            {data.name}
          </Link>
        </td>

        <td>{Math.round(data.toBePaid).toLocaleString()}</td>
      </tr>
    );
  });

  const render = Cart.cars.map((data) => {
    return (
      <tr key={data.id}>
        <td>
          <img className="order-picture" src={data.picture}></img>
        </td>
        <td>
          <Link
            to={"/hiredview"}
            onClick={() => {
              setProductData({ ...data });
              navigate("/hiredview");
            }}
          >
            {data.name}
          </Link>
        </td>

        <td>{Math.round(data.amount * data.days).toLocaleString()}</td>
      </tr>
    );
  });

  return (
    <main>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="page_sec">
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
            <h2>Checkout</h2>
            <div className="cart_avatar" onClick={() => navigate("/mycars")}>
          <img src="images/carticon.png" height={35} width={35} />
        </div>
          </div>
          <div className="checkout-page">
            <section className="checkout-modal">
              <marquee> Form Data Is Not Submitted App On Demo</marquee>
              <h4>Order Summary</h4>

              {Cart.cars.length > 0 && (
                <div className="hire_info">
                  <div>
                    <h5>Hired Cars</h5>

                    <div className="car-notice">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="16"
                        height="16"
                      >
                        <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path>
                      </svg>
                      <p> Car Will Be Picked and Returned To Drop Point</p>
                    </div>
                    <table>
                      <thead>
                        <th>Image</th>
                        <th>Name</th>

                        <th>Cost</th>
                      </thead>

                      <tbody>{render}</tbody>
                    </table>
                  </div>
                </div>
              )}
              {Cart.bookings.length > 0 && (
                <div className="booking_info">
                  <h5>Booked Cars</h5>
                  <table>
                    <th>Image</th>
                    <th>Name</th>

                    <th>Cost</th>

                    <tbody> {renderbooking}</tbody>
                  </table>
                </div>
              )}
              {Cart.totalAmount > 0 ? (
                <p>
                  Total:.Ksh.<b>{Cart.totalAmount.toLocaleString()}</b>
                </p>
              ) : (
                <div className="hire_info">
                  <p>Your Cart Is Empty!!</p>
                </div>
              )}

              <div
                className="booking_info"
                style={{
                  marginBottom: 20,
                }}
              >
                <h4>Customer Details</h4>
                <p>
                  Name: <span className="grey">{user.displayName}</span>
                </p>
                <p>
                  {" "}
                  Email: <span className="grey">{user.email}</span>
                </p>
                <p>
                  {" "}
                  Phone: <span className="grey">{user.phone}</span>
                </p>
              </div>

              <section className="userdata">
                <div className="checkout-method-select">
                  <div
                    className="bucket-nav"
                    style={{
                      marginBottom: 20,
                    }}
                  >
                    <button
                      className="button"
                      style={{
                        backgroundColor: "#21262d",
                        border: tab === 0 && ` ${3}px solid white`,
                      }}
                      onClick={() => {
                        setTab(0);
                      }}
                    >
                      Visa
                    </button>
                    <button
                      className="button"
                      style={{
                        backgroundColor: "#21262d",
                        border: tab === 1 && ` ${3}px solid white`,
                      }}
                      onClick={() => {
                        setTab(1);
                      }}
                    >
                      M-Pesa
                    </button>
                  </div>
                </div>
              </section>

              <>{tab === 0 ? <CreditCard /> : <Pay_By_Mpesa />}</>
            </section>
          </div>
        </div>
      )}
    </main>
  );
};

export { Checkout };
