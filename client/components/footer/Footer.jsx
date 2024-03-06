import { Link } from "react-router-dom";
import "./index.css";

const Footer = () => {
  return (
    <footer>
      <a href="#">Team</a>

      <div className="footer-div">
        <Link to="/about">About Us</Link>
        <Link to="/whatwedo">What We Do</Link>
      </div>
      <Link to="/contact">Contact Us</Link>
      <p>&copy;2024 copyrights||Zuri.com||MayeCompanies </p>
    </footer>
  );
};

export { Footer };
