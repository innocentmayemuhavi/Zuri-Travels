import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../src/Assets/Context";
import { FirebaseContext } from "../../src/Assets/Context/firebaseContext";

const CarHireCard = (props) => {
  const { setProductData } = useContext(AuthContext);
  const { user } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];
  return (
    <div
      className="car-card"
      key={props.id}
      onClick={() => {
        setProductData({
          id: props.id,
          uid: user.uid,
          time_of_hire: new Date().toLocaleTimeString(),
          picture: props.picture,
          name: props.name,
          description: props.description,
          days: 1,
          pick_up: formattedDate,
          amount: props.price,
          status: "Pending",
          drop_point: "Kencom Point",
        });
        navigate("/service");
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

export { CarHireCard };
