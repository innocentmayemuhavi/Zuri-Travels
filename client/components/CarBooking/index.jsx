import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../src/Assets/Context";
import { Button } from "../Button/Index";
import { BookingCard } from "../Cards/BookingCard";
import { Footer } from "../footer/Footer";
import { Header } from "../Header/Header";
import React from "react";
import "./index.css";
import { useEffect } from "react";
import { FirebaseContext } from "../../src/Assets/Context/firebaseContext";
const TravellingPage = () => {
  const { isLoading, setisLoading } = useContext(AuthContext);
  const { cars } = useContext(FirebaseContext);
  const filtered = Object.values(cars).filter(
    (data) => data.category === "coach"
  );
  const render = filtered.map((data) => (
    <BookingCard key={data.id} {...data} />
  ));

  return (
    <main
      style={{
        textAlign: "center",
      }}
      className="hire-page fade"
    >
      <Header />
      <h1> Car Booking</h1>
      <hr />

      {filtered.length < 1 ? (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="30"
            height="30"
            className="rotate"
          >
            <path d="M14.307 11.655a.75.75 0 0 1 .165 1.048 8.05 8.05 0 0 1-1.769 1.77.75.75 0 0 1-.883-1.214 6.552 6.552 0 0 0 1.44-1.439.75.75 0 0 1 1.047-.165Zm-2.652-9.962a.75.75 0 0 1 1.048-.165 8.05 8.05 0 0 1 1.77 1.769.75.75 0 0 1-1.214.883 6.552 6.552 0 0 0-1.439-1.44.75.75 0 0 1-.165-1.047ZM6.749.097a8.074 8.074 0 0 1 2.502 0 .75.75 0 1 1-.233 1.482 6.558 6.558 0 0 0-2.036 0A.751.751 0 0 1 6.749.097ZM.955 6.125a.75.75 0 0 1 .624.857 6.558 6.558 0 0 0 0 2.036.75.75 0 1 1-1.482.233 8.074 8.074 0 0 1 0-2.502.75.75 0 0 1 .858-.624Zm14.09 0a.75.75 0 0 1 .858.624c.13.829.13 1.673 0 2.502a.75.75 0 1 1-1.482-.233 6.558 6.558 0 0 0 0-2.036.75.75 0 0 1 .624-.857Zm-8.92 8.92a.75.75 0 0 1 .857-.624 6.558 6.558 0 0 0 2.036 0 .75.75 0 1 1 .233 1.482c-.829.13-1.673.13-2.502 0a.75.75 0 0 1-.624-.858Zm-4.432-3.39a.75.75 0 0 1 1.048.165 6.552 6.552 0 0 0 1.439 1.44.751.751 0 0 1-.883 1.212 8.05 8.05 0 0 1-1.77-1.769.75.75 0 0 1 .166-1.048Zm2.652-9.962A.75.75 0 0 1 4.18 2.74a6.556 6.556 0 0 0-1.44 1.44.751.751 0 0 1-1.212-.883 8.05 8.05 0 0 1 1.769-1.77.75.75 0 0 1 1.048.166Z"></path>
          </svg>
        </div>
      ) : (
        <section className="car-booking-body">{render}</section>
      )}
      <Link to={"/"}>
        <Button text="Back" type="button" />
      </Link>
      <Footer />
    </main>
  );
};
export default TravellingPage;
