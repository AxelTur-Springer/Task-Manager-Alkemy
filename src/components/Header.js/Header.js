import "./Header.style.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const Header = () => {
  const navigate = useNavigate();

  const { tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    navigate("/login", { replace: true });
  };
  return (
    <header>
      <span>GO SCRUM</span>
      <div className="wrapper_right_header">
        <div>
          <button
            onClick={() => navigate("/donate", { replace: true })}
          ></button>
        </div>
        <div className="black"> Tareas creadas: {tasks?.length}</div>
        <div>{localStorage.getItem("userName")}</div>
        <div onClick={handleLogout}>x</div>
      </div>
    </header>
  );
};
