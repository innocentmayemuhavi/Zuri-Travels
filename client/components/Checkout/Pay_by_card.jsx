import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { AuthContext } from "../../src/Assets/Context";
import { Notifications } from "../notification/Notification";
const Pay_By_Card = () => {
  const { showNotification, setNotification, setShowNotification } =
    useContext(AuthContext);
  const [Details, setdetails] = useState({});
  const navigate = useNavigate();
  const Check = (event) => {
    const { name, value } = event.target;
    setdetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const currentDate = new Date().toISOString().split("T")[0];
  const submit = (event) => {
    event.preventDefault();
    console.log(Details);

    // setNotification(
    //   <p>
    //     <b>Notification:</b> Payment Request Sent Successfully Receipt will
    //     generate soon await here ,give transaction code to your Customer Service
    //     Provider
    //   </p>
    // );
    setShowNotification(true);
    // navigate('/receipt')
  };

  return (
    <form className="payment-modal" onSubmit={submit}>
      <p>Paying via Card</p>
      <hr />
      <section className="payment-modal-input">
        <fieldset className="payment-modal-input">
          <legend>Payment Details</legend>
          <label>Card Number:</label>
          <input
            type={"number"}
            required={true}
            name="cardnumber"
            onChange={Check}
            maxLength={14}
          />
          <label>Card CVV :</label>
          <input
            type={"number"}
            required={true}
            name={"src"}
            onChange={Check}
            maxLength={3}
          />
          <label>Card Expiry Date:</label>
          <input
            type={"date"}
            required={true}
            name={"expdate"}
            min={currentDate}
            onChange={Check}
          />
          <label>User Id Number:</label>
          <input
            type={"number"}
            required={true}
            name="userid"
            onChange={Check}
            maxLength={6}
          />
        </fieldset>
      </section>
      <div className="form-button">
        <button>Submit</button>
      </div>
      <Notifications />
      {/* {showNotification&&<Notifications/>} */}
      <h1>Ggggggggggg</h1>
    </form>
  );
};
export { Pay_By_Card };
