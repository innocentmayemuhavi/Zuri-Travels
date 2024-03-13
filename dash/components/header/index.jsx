import { useContext } from "react";
import { FirebaseContext } from "../context/firebase";
import "./index.css";
import Nav from "../nav";
import { AppContext } from "../context/appcontext";

const Header = () => {
  const { user, signin, signout } = useContext(FirebaseContext);
  const { showNav, setShowNav } = useContext(AppContext);
  console.log(user);

  const data = null;
  return (
    <header>
      {showNav && <Nav />}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="16"
        height="16"
        onClick={() => setShowNav((prev) => !prev)}
      >
        <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"></path>
      </svg>

      <div className="account-div">
        <div className="avatar" onClick={() => signout()}>
          {user.displayName ? user.displayName[0] : "U"}
        </div>
        <p>
          {user.displayName ? user.displayName.slice(0, 10) + "..." : "User"}
        </p>
      </div>
    </header>
  );
};

export { Header };
