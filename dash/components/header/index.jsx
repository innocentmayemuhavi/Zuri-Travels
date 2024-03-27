import { useContext } from "react";
import { FirebaseContext } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Nav from "../nav";
import { AppContext } from "../context/appcontext";

const Header = (props) => {
  console.log(props.hasback);
  const { user, signin, signout, } = useContext(FirebaseContext);
  const { showNav, setShowNav } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <header>
      {/*      
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="16"
        height="16"
        onClick={() => setShowNav((prev) => !prev)}
      >
        <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"></path>
      </svg> */}
      {props.hasback && (
        <div className="back" onClick={() => navigate(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="18"
            height="18"
          >
            <path d="M9.78 12.78a.75.75 0 0 1-1.06 0L4.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L6.06 8l3.72 3.72a.75.75 0 0 1 0 1.06Z"></path>
          </svg>
          Back
        </div>
      )}
      <h3>{props.title}</h3>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div className="account-div">
          <div className="avatar">
            {user.displayName ? user.displayName[0] : "U"}
          </div>
          <p>
            {user.displayName ? user.displayName.slice(0, 10) + "..." : "User"}
          </p>
        </div>
        <svg
          onClick={() => signout()}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path d="M3 3.25c0-.966.784-1.75 1.75-1.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.25.25 0 0 0-.25.25v17.5c0 .138.112.25.25.25h5.5a.75.75 0 0 1 0 1.5h-5.5A1.75 1.75 0 0 1 3 20.75Zm16.006 9.5H10.75a.75.75 0 0 1 0-1.5h8.256l-3.3-3.484a.75.75 0 0 1 1.088-1.032l4.5 4.75a.75.75 0 0 1 0 1.032l-4.5 4.75a.75.75 0 0 1-1.088-1.032Z"></path>
        </svg>
      </div>
    </header>
  );
};

export { Header };
