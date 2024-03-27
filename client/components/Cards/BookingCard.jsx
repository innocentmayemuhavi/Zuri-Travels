import { lazy, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../src/Assets/Context";
import { FirebaseContext } from "../../src/Assets/Context/firebaseContext";
import React from "react";
const BookingCard = (props) => {
  const navigate = useNavigate();
  const { setServiceData } = useContext(AuthContext);
  const { user } = useContext(FirebaseContext);

  const updatedata = () => {
    setServiceData((prev) => {
      return {
        ...prev,
        uid: user.uid,
        time_of_hire: new Date().toLocaleTimeString(),
        from: "Kapsabet",
        to: "Mombasa",
        seat: "1A",
        time: "Morning: 07:00",
        cost: 3000,
        status: "Pending",
        toBePaid: 3000 - 3000 * (prev.offer * 0.01),
      };
    });
  };

  return (
    <section
      className="booking-card"
      onClick={() => {
        setServiceData({ ...props });
        updatedata();
        navigate("/servicepage");
      }}
    >
      <div className="booking-card-image">
        <img src={props.picture} loading={lazy}></img>
      </div>

      <div className="booking-card-data">
        <h3>{props.name}</h3>
      </div>
    </section>
  );
};

export { BookingCard };
