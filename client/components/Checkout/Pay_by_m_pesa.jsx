import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../src/Assets/Context/firebaseContext";
import { nanoid } from "nanoid";
import { Timestamp } from "firebase/firestore";
import { AuthContext } from "../../src/Assets/Context";
const Pay_By_Mpesa = () => {
  const [Details, setdetails] = useState({});

  const { Cart, user, updateTransaction } = useContext(FirebaseContext);
  const { showNotification, setNotification, setShowNotification } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const Check = (event) => {
    const { name, value } = event.target;
    setdetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submit = async (event) => {
    event.preventDefault();

    console.log("requesting");

    // fetch(`http://localhost:5174/stk/${Cart.totalAmount}/${user.phone}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     navigate("/receipt");
    //   })
    //   .catch((error) => console.error("Error:", error));
    updateTransaction({
      amount: Cart.totalAmount,
      status: "Pending",
      id: nanoid(50),
      timestamp: Timestamp.now(),
      name: user.displayName,
      email: user.email,
      phone: user.phone,
      uid: user.uid,
    });

    setNotification(
      <p>
        <b>Notification:</b> Payment Request Sent Successfully Receipt will
        generate soon give transaction code to your Customer Service Provider
      </p>
    );
    setShowNotification(true);

    setTimeout(() => navigate("/receipt"), 5000);
  };

  return (
    <form className="payment-modal" onSubmit={submit}>
      <p>Paying via Mpesa</p>
      <hr />
      <section className="payment-modal-input">
        <fieldset className="payment-modal-input">
          <legend>Payment Details</legend>
          <div></div>
          <div>
            Amount To Pay: Ksh. {parseInt(Cart.totalAmount).toLocaleString()}
          </div>
        </fieldset>
      </section>
      <div className="form-button">
        <button
          className={`button ${Cart.totalAmount === 0 && "disabled"}`}
          disabled={Cart.totalAmount === 0 && true}
        >
          Submit
        </button>
      </div>
      
    </form>
  );
};

export { Pay_By_Mpesa };
