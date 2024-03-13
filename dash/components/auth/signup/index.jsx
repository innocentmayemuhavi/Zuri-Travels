import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";

import "./index.css";
import { FirebaseContext } from "../../context/firebase";
const SignUp = () => {
  const { signup, warning, user,isLoading } = useContext(FirebaseContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
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
    // setisLoading(true);
    try {
      await signup(data.email, data.password, data.name, data.phone);

      // navigate("/login");
      // setisLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

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
          <div className="page-input1">
            <label htmlFor="name">Name</label>
            <input
              type={"text"}
              placeholder="Name"
              required={true}
              name="name"
              onChange={handleData}
              value={data.name}
            />
          </div>
          <div className="page-input1">
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
          <div className="page-input1">
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
          <div className="page-input1">
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
          <p>
            Already Have An Account? Click <Link to={"/login"}>here</Link>
          </p>

          <button className="button">
            {isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="25"
                height="25"
                className="rotate"
              >
                <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-1.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm5.657-8.157a.75.75 0 0 1 0 1.061l-1.061 1.06a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734l1.06-1.06a.75.75 0 0 1 1.06 0Zm-9.193 9.193a.75.75 0 0 1 0 1.06l-1.06 1.061a.75.75 0 1 1-1.061-1.06l1.06-1.061a.75.75 0 0 1 1.061 0ZM8 0a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 8 0ZM3 8a.75.75 0 0 1-.75.75H.75a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 3 8Zm13 0a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 16 8Zm-8 5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 13Zm3.536-1.464a.75.75 0 0 1 1.06 0l1.061 1.06a.75.75 0 0 1-1.06 1.061l-1.061-1.06a.75.75 0 0 1 0-1.061ZM2.343 2.343a.75.75 0 0 1 1.061 0l1.06 1.061a.751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018l-1.06-1.06a.75.75 0 0 1 0-1.06Z"></path>
              </svg>
            ) : (
              "SignUp"
            )}
          </button>
        </form>
      </main>
    </>
  );
};

export { SignUp };
