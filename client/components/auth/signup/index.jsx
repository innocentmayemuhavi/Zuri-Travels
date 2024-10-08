import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../../../src/Assets/Context";
import Loading from "../../Loading";
import React from "react";
import "./index.css";
import { FirebaseContext } from "../../../src/Assets/Context/firebaseContext";

const SignUp = () => {
  const { setisLoading, isLoading } = useContext(AuthContext);
  const { signup, warning, user, setWarning } = useContext(FirebaseContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleData = () => {
    const { name, value } = event.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const submit = async (event) => {
    event.preventDefault();
    setisLoading(true);
    if (data.password !== data.confirm) {
      setWarning("Passwords do not match");
      setisLoading(false);
    } else {
      try {
        await signup(data.email, data.password, data.name, data.phone);

        // navigate("/login");
        setisLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (warning) {
      setTimeout(() => {
        setWarning("");
      }, 5000);
    }
  }, [warning]);
  return user ? (
    <Navigate to="/" />
  ) : (
    <>
      <main className="fade login-page">
        <form className="login-form" onSubmit={submit}>
          <div className="form-label">
            <h3>Sign Up</h3>
          </div>
          <hr />
          <p className="warning">{warning}</p>
          <div className="page-input">
            <label htmlFor="name">User Name</label>
            <input
              type={"text"}
              placeholder="User Name"
              required={true}
              name="name"
              onChange={handleData}
              value={data.name}
            />
          </div>
          <div className="page-input">
            <label htmlFor="email">Email</label>
            <input
              type={"email"}
              placeholder="Email"
              required={true}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              name="email"
              onChange={handleData}
              value={data.email}
            />
          </div>
          <div className="page-input">
            <label htmlFor="phone">Phone</label>
            <input
              type={"number"}
              placeholder="Phone Number"
              required={true}
              name="phone"
              onChange={handleData}
              value={data.phone}
            />
          </div>
          <div className="page-input">
            <label htmlFor="password">Password</label>
            <input
              type={"password"}
              placeholder="Password"
              required={true}
              name="password"
              onChange={handleData}
              value={data.password}
            />
          </div>
          <div className="page-input">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              type={"password"}
              placeholder="Confirm Password"
              required={true}
              name="confirm"
              onChange={handleData}
              value={data.confirm}
            />
          </div>
          <p>
            Already Have An Account? Click <Link to={"/login"}>here</Link>
          </p>

          <button className="button">Sign Up</button>
        </form>
      </main>
    </>
  );
};

export { SignUp };
