import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../src/Assets/Context";
import { Notifications } from "../notification/Notification";
import "./index.css";
import { FirebaseContext } from "../../src/Assets/Context/firebaseContext";
import GridComponent from "./seat-grid";

const BookingService = () => {
  const {
    serviceData,
    setServiceData,
    setNotification,
    setShowNotification,
    showNotification,
  } = useContext(AuthContext);

  const { Cart, setCart, user, setCars, cars } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleInputChange = (event, data) => {
    const { name, value } = event.target;

    if (data.to === value) {
      console.log("invalid");
    } else {
      if (data.from === value) {
        console.log("invalid");
      } else {
        setServiceData((prev) => ({
          ...prev,
          [name]: value,
          uid: user.uid,
          status: "Pending",
          time: new Date().toDateString(),
        }));
      }
    }
  };

  const handleBooking = async (id) => {
    console.log(serviceData);
    const exists = Cart.bookings.find((data) => data.id === id);

    if (exists) {
      let filll = Cart.bookings.filter((data) => data.id === id);
      setNotification((prev) => (
        <p>
          You have already <strong>Booked</strong> <b> {filll[0].name} </b> at{" "}
          <b>{filll[0].from}</b> scheduled from <b>{filll[0].time}</b>
          {filll[0].days > 1 ? "s" : ""}
        </p>
      ));

      setShowNotification(true);
    } else {
      const newData = Cart.bookings.slice();
      newData.push(serviceData);
      const bookingsAmount = newData.reduce(
        (prev, current) => prev + current.toBePaid,
        0
      );

      await setCart((prev) => ({
        ...prev,
        cars: prev.cars,
        bookings: newData,
        bookingsAmount: bookingsAmount,
        totalAmount: bookingsAmount + prev.hireAmount,
      }));

      const newBookings = Object.values(cars).filter((data) => data.id === id)[0]
      .bookedSeats;
    newBookings.push(serviceData.seat);

    console.log(newBookings);

    const newData1 = Object.values(cars).map((data) => {
      return data.id === id
        ? {
            ...data,
            bookedSeats: newBookings,
          }
        : data;
    });

    setCars((prev) => {
      return {
        ...newData1,
      };
    });
      let filll = newData.filter((data) => data.id === id);

      setNotification((prev) => (
        <p>
          You have <strong>Booked</strong> <b> {filll[0].name} </b> at{" "}
          <b>{filll[0].from}</b> scheduled from <b>{filll[0].time}</b>
        </p>
      ));
      setShowNotification(true);
    }

  
  
  };
  const SeatOptions = ({ seats, bookedSeats }) => {
    const generateLabel = (index) => {
      const rowNumber = Math.ceil(index / 5);
      const baseCharCode = "A".charCodeAt(0);
      const char = String.fromCharCode(baseCharCode + ((index - 1) % 5));
      return `${rowNumber}${char}`;
    };

    const getAvailableSeats = () => {
      const availableSeats = [];
      const maxSeatIndex = Math.min(
        seats * 5,
        "E".charCodeAt(0) - "A".charCodeAt(0) + 1
      );

      for (let i = 1; i <= seats; i++) {
        const seatLabel = generateLabel(i);
        if (!bookedSeats.includes(seatLabel)) {
          availableSeats.push(i);
        }
      }

      return availableSeats;
    };

    const availableSeats = getAvailableSeats();

    return (
      <select
        value={serviceData.seat}
        onChange={(event) => {
          handleInputChange(event, { ...serviceData });
          console.log(event.target.value);
        }}
        name="seat"
      >
        {availableSeats.map((seatId) => (
          <option key={seatId} value={generateLabel(seatId)}>
            {generateLabel(seatId)}
          </option>
        ))}
      </select>
    );
  };

  return (
    <main className="service-page">
      {showNotification && <Notifications />}
      <div className="service-page-header">
        <div>
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            onClick={() => navigate(-1)}
          >
            <path d="M10.78 19.03a.75.75 0 01-1.06 0l-6.25-6.25a.75.75 0 010-1.06l6.25-6.25a.75.75 0 111.06 1.06L5.81 11.5h14.44a.75.75 0 010 1.5H5.81l4.97 4.97a.75.75 0 010 1.06z"></path>
          </svg>
        </div>

        <div className="trips-tag">
          <p>{serviceData.trips} Trip(s)/Day</p>
        </div>
      </div>
      <div className="service-page-section">
        <div className="service-page-image">
          <img src={serviceData.picture} alt="Bus Preview"></img>
          <div className="offer-tag">
            <p>{serviceData.offer} % OFF</p>
          </div>
        </div>
        <div className="service-page-data">
          <div className="c-d">
            <h3>Bus Name: {serviceData.name}</h3>
            <h3>
              Price:<span>{Math.round(serviceData.cost).toLocaleString()}</span>{" "}
              <p>
                Now:
                {Math.round(
                  serviceData.cost -
                    serviceData.cost * (serviceData.offer * 0.01)
                ).toLocaleString()}
              </p>
            </h3>
          </div>
          <div className="page-input">
            <label>From:</label>
            <select
              value={serviceData.from}
              onChange={() => handleInputChange(event, { ...serviceData })}
              name="from"
            >
              <option>Kapsabet</option>
              <option>Nairobi</option>
              <option>Mombasa</option>
            </select>
          </div>

          <div className="page-input">
            <label>To:</label>
            <select
              value={serviceData.to}
              onChange={() => handleInputChange(event, { ...serviceData })}
              name="to"
            >
              <option>Kapsabet</option>
              <option>Nairobi</option>
              <option>Mombasa</option>
            </select>
          </div>
          <div className="seats-holder">
            <GridComponent
              seats={serviceData.seats}
              bookedSeats={serviceData.bookedSeats}
            />
          </div>
          <div className="page-input">
            <label>Seat:</label>
            <SeatOptions
              seats={serviceData.seats}
              bookedSeats={serviceData.bookedSeats}
            />
          </div>
          <div className="page-input">
            <label>Time:</label>
            <select
              value={serviceData.time}
              name="time"
              onChange={() => handleInputChange(event, { ...serviceData })}
            >
              <option>Morning: 07:00</option>
              {serviceData.trips === 3 && <option>AfterNoon: 12:00</option>}
              <option>Evening: 19:00</option>
            </select>
          </div>
          <div className="book-btn">
            <button onClick={() => navigate(-1)}>Cancel</button>
            <button onClick={() => handleBooking(serviceData.id)}>Book</button>
          </div>
        </div>
        <div className="card_footer"></div>
      </div>
    </main>
  );
};

export default BookingService;
