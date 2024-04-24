import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../src/Assets/Context/firebaseContext";
import { nanoid } from "nanoid";
import { Timestamp } from "firebase/firestore";
import { AuthContext } from "../../src/Assets/Context";
import React from "react";
const Pay_By_Mpesa = () => {
  const [Details, setdetails] = useState({});

  const { Cart, user, updateTransaction } = useContext(FirebaseContext);
  const { showNotification, setNotification, setShowNotification } =
    useContext(AuthContext);
  const [phoneToPay, setPhoneToPay] = useState(user.phone);
  const navigate = useNavigate();
  const Check = (event) => {
    const { name, value } = event.target;
    setdetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submit = async (event) => {
    event.preventDefault();

    console.log();
    const url = `http://localhost:5175/stk/${Cart.totalAmount}/${phoneToPay}`;

    if (phoneToPay.length === 10) {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(Cart);
          updateTransaction({
            amount: Cart.totalAmount,
            status: "Pending",
            id: nanoid(50),
            timestamp: Timestamp.now(),
            name: user.displayName,
            bookingsAmount: parseInt(Cart.bookingsAmount),
            hireAmount: parseInt(Cart.hireAmount),
            email: user.email,
            phone: user.phone,
            uid: user.uid,
          });

          setNotification(
            <p>
              <b>Notification:</b> Payment Request Sent Successfully Receipt
              will generate soon await here ,give transaction code to your
              Customer Service Provider
            </p>
          );
          setShowNotification(true);

          setTimeout(() => navigate("/receipt"), 5000);
        })
        .catch((error) => {
          console.error("Error:", error);
          setNotification(
            <p>
              <b>Notification:</b> Payment Request Failed Please Try Again
            </p>
          );
          setShowNotification(true);
        });
    } else {
      setNotification(
        <p>
          <b>Notification:</b> Phone Number must be 10 digits.Enter valid phone
          number
        </p>
      );
      setShowNotification(true);
    }
  };

  return (
    <form className="payment-modal" onSubmit={submit}>
      <p>Paying via Mpesa</p>
      <hr />
      <section className="payment-modal-input">
        <fieldset className="payment-modal-input">
          <legend>Payment Details</legend>
          <div className="page-input1">
            <label>Phone Number:</label>
            <input
              minLength={10}
              min={10}
              type={"number"}
              required={true}
              autoComplete="on"
              name="phone"
              onChange={() => setPhoneToPay(event.target.value)}
              value={phoneToPay}

              // disabled={showAddnumber}
            />
          </div>
          <div className="page-input1">
            <label>Ammount:</label>
            <input
              type={"string"}
              required={true}
              disabled={true}
              name="phone"
              onChange={Check}
              value={`Ksh. ${parseInt(Cart.totalAmount).toLocaleString()}`}
              // disabled={showAddnumber}
            />
          </div>
        </fieldset>
      </section>
      <div className="form-button">
        <button
          className={`button ${Cart.totalAmount === 0 && "disabled"}`}
          disabled={Cart.totalAmount === 0 && true}
        >
          pay
        </button>
      </div>
    </form>
  );
};

export { Pay_By_Mpesa };
