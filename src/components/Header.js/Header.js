import "./Header.style.css";
import { useNavigate } from "react-router-dom";
import { replace } from "formik";
export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("logged");
    navigate("/login", { replace: true });
  };
  return (
    <header>
      <span>GO sCRUM</span>
      <div onClick={handleLogout}>x</div>
    </header>
  );
};
