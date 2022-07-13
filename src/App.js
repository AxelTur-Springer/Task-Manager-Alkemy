import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Error404 } from "./components/views/Error404/Error404";
import { Tasks } from "./components/views/Task/Tasks";
export const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Tasks />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<Error404 />} />
    </Routes>
  </>
);
