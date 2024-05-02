import { useContext, useState } from "react";
import { AppContext } from "../context/appcontext";
import "./index.css";
import { FirebaseContext } from "../context/firebase";
import { Timestamp } from "firebase/firestore";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
const ConfirmPayModal = (props) => {
  const { updateTransaction } = useContext(FirebaseContext);
  const { modalData, setModalData, setShowPayModal } = useContext(AppContext);
  const [error, setError] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  console.log(modalData);

  const handleData = (event) => {
    const { name, value } = event.target;
    setModalData((prev) => {
      return {
        ...prev,
        [name]: value.toUpperCase(),
      };
    });
  };

  const submitMail = async () => {};
  const submit = async () => {
    console.log(modalData.code);
    if (modalData.code.length <= 0) {
      setError("Please enter a valid transaction code!");
      setShowError(true);
    } else {
      setIsLoading(true);

      init("NaS0G2GgqBwbsHB-n");

      emailjs
        .send("service_0pwhu4f", "template_dqt6zza", {
          name: modalData.name,
          email: modalData.email,
          amount: modalData.amount,
          date: Timestamp.now().toDate().toString(),
          code: modalData.code,
        })
        .then(
          async (response) => {
            await updateTransaction(
              modalData.uid,
              modalData.id,
              modalData.code,
              Timestamp.now()
            );
            console.log("SUCCESS!", response.status, response.text);
            setShowPayModal(false);
            setIsLoading(false);
          },
          (err) => {
            console.log("FAILED...", err);
            setIsLoading(false);
          }
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
        <button
          onClick={() => setShowPayModal(false)}
          className="button"
          disabled={isloading}
        >
          Cancel
        </button>
        <button className="button" onClick={submit} disabled={isloading}>
          {isloading ? "Please Wait" : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export { ConfirmPayModal };
