import { lazy, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../src/Assets/Context";
import { FirebaseContext } from "../../src/Assets/Context/firebaseContext";
const CarBookingCard = (props) => {
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
    <div
      className="car-card"
      key={props.id}
      onClick={() => {
        setServiceData({ ...props });
        updatedata();
        navigate("/servicepage");
      }}
    >
      <div className="car-card-picture">
        <img src={props.picture} alt={props.name} />
      </div>

      <p className="car-card-name">{props.name}</p>
      <p className="car-card-desc">{props.description.slice(0, 25) + "..."}</p>
      <p className="car-card-price">
        Ksh. {parseInt(props.price).toLocaleString()}
      </p>
    </div>
  );
};

export { CarBookingCard };
