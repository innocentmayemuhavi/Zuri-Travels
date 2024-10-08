import { AuthContext } from "../../src/Assets/Context";
import React, { useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

const Notifications = () => {
  const { Notification, setShowNotification, showNotification } =
    useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setShowNotification(false);
    }, 7000);
  }, [showNotification]);
  return (
    <section className="notification">
      <div className="notification-header">
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          onClick={() => {
            setShowNotification(false);
          }}
        >
          <path d="M2.344 2.343h-.001a8 8 0 0 1 11.314 11.314A8.002 8.002 0 0 1 .234 10.089a8 8 0 0 1 2.11-7.746Zm1.06 10.253a6.5 6.5 0 1 0 9.108-9.275 6.5 6.5 0 0 0-9.108 9.275ZM6.03 4.97 8 6.94l1.97-1.97a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l1.97 1.97a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-1.97 1.97a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L6.94 8 4.97 6.03a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018Z"></path>
        </svg>
      </div>
      <div className="notification-body">{Notification}</div>
      <div className="notification-buttons">
        <Link to={"/carhire"}>
          <button
            onClick={() => {
              setShowNotification(false);
              navigate(-2);
            }}
          >
            Cancel
          </button>
        </Link>

        <Link to={"/mycars"}>
          <button
            onClick={() => {
              setShowNotification(false);
            }}
          >
            View My Cars
          </button>
        </Link>
      </div>
    </section>
  );
};

export { Notifications };
