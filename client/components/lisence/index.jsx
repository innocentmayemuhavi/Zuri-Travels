import { useContext, useState } from "react";
import "./index.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../src/Assets/Context";
import Loading from "../Loading";
import { FirebaseContext } from "../../src/Assets/Context/firebaseContext";
const LisencePage = () => {
  const navigate = useNavigate();
  const [data, setsdata] = useState({});
  const { isLoading, setisLoading } = useContext(AuthContext);
  const { updateUser } = useContext(FirebaseContext);
  const currentDate = new Date().toISOString().split("T")[0];

  const submit = async (event) => {
    event.preventDefault();

    await updateUser(data);
    navigate(-1);
  };
  const handleData = (event) => {
    const { name, value } = event.target;
    setsdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <main className="lisence-page">
          <div className="dialog-header"></div>
          <form className="login-form" onSubmit={submit}>
            <div className="form-label">
            <h3>Lisence Verification</h3>
            </div>
            <hr />
            <p className="warning"></p>
          <div className="page-input">
          <label>Enter Email:</label>
            <input
              type={"email"}
              placeholder="Enter Email"
              required={true}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              name="email"
              onChange={handleData}
            />
          </div>
           <div className="page-input">
           <label>ID Number: </label>
            <input
              type={"number"}
              placeholder="Id Number"
              required={true}
              name="id"
              onChange={handleData}
            />
           </div>
           <div className="page-input">
           <label>License Number: </label>
            <input
              type={"number"}
              placeholder="Licence Number"
              required={true}
              name="license_number"
              onChange={handleData}
            />
           </div>
           <div className="page-input">
           <label>Expiring Date:</label>
            <input
              type={"date"}
              placeholder="Expiration Date"
              required={true}
              name="exp_date"
              onChange={handleData}
              min={currentDate}
            />
           </div>

            <div className="page-input">
              <label>Category:</label>
              <select name="category" onChange={handleData} required={true}>
                <option>Select Category</option>
                <option value={"Catgory A"}>Category A</option>
                <option value={"Catgory B"}>Category B</option>
                <option value={"Catgory C"}>Category C</option>
                <option value={"Catgory D"}>Category D</option>
                <option value={"Catgory E"}>Category E</option>
                <option value={"Catgory F"}>Category F</option>
                <option value={"Catgory G"}>Category G</option>
              </select>
            </div>
            <button className="button">verify</button>
          </form>
        </main>
      )}
    </>
  );
};

export { LisencePage };
