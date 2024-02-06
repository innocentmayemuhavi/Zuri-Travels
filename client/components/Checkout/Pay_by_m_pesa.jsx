import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../src/Assets/Context/firebaseContext";

const Pay_By_Mpesa = () => {
  const [Details, setdetails] = useState({});

  const { Cart } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const Check = (event) => {
    const { name, value } = event.target;
    setdetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submit = (event) => {
    event.preventDefault();

    navigate("/receipt");
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
        <button className="button">Submit</button>
      </div>
    </form>
  );
};

export { Pay_By_Mpesa };
