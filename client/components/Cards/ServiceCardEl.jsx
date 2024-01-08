import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../src/Assets/Context";
import "./index.css";
import { Timestamp } from "firebase/firestore";
import { FirebaseContext } from "../../src/Assets/Context/firebaseContext";
const ServiceCardEl = (props) => {
  const { setProductData } = useContext(AuthContext);
  const { user } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];
  return (
    <div
      className="service"
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
      <div className="service-picture">
        <img
          src={props.picture}
          alt="Picture"
          onClick={() => navigate("/service")}
        />
      </div>
      <div className="service-content">
        <p>
          Service: <span className="gray">{props.name}</span>
        </p>
        <p>
          Available: <span className="gray">{props.available}</span>
        </p>
        <p>
          Description:{" "}
          <span className="gray">{props.description.slice(0, 17) + "..."}</span>
        </p>
        <p>
          Price/Day:{" "}
          <span className="gray">{props.price.toLocaleString()}</span>
        </p>
      </div>
    </div>
  );
};

export { ServiceCardEl };
