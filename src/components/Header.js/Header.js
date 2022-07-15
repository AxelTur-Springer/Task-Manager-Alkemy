import "./Header.style.css";
import { useNavigate } from "react-router-dom";
import { replace } from "formik";
export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    navigate("/login", { replace: true });
  };
  return (
    <header>
      <span>GO SCRUM</span>
      <div className="wrapper_right_header">
        <div>{localStorage.getItem("userName")}</div>
        <div onClick={handleLogout}>x</div>
      </div>
    </header>
  );
};
