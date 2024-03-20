import { useContext, useState } from "react";
import { AppContext } from "../context/appcontext";
import "./index.css";
import { FirebaseContext } from "../context/firebase";
import { Timestamp } from "firebase/firestore";
const ConfirmPayModal = (props) => {
  const { updateTransaction } = useContext(FirebaseContext);
  const { modalData, setModalData, setShowPayModal } = useContext(AppContext);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  console.log(modalData);

  const handleData = (event) => {
    const { name, value } = event.target;
    setModalData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submit = async () => {
    console.log(modalData.code);
    if (modalData.code.length <= 0) {
      setError("Please enter a valid transaction code!");
      setShowError(true);
    } else {
      await updateTransaction(
        modalData.uid,
        modalData.id,
        modalData.code,
        Timestamp.now()
      );
      setShowPayModal(false);
    }
  };

  setTimeout(() => {
    setShowError(false);
    setError("");
  }, 3000);
  return (
    <div className="overlay1 fade">
      <div className="modal">
        <h3>Confirm Payment</h3>
        <p>Enter Transaction code</p>
        <p
          style={{
            color: "red",
          }}
        >
          {error}
        </p>
        <div className="page-input">
          <label>Transaction Code</label>
          <input
            type="text"
            name="code"
            onChange={handleData}
            style={{ textTransform: "upperCase" }}
          />
        </div>
        <button className="button">Cancel</button>
        <button className="button" onClick={submit}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export { ConfirmPayModal };
