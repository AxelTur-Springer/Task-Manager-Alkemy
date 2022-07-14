import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import "../Auth.style.css";

export const Register = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://goscrum-api.alkemy.org/auth/data")
      .then((response) => response.json())
      .then((data) => {
        setData(data.result);
      });
  }, []);
  console.log(data);
  const initialValues = {
    username: "",
    password: "",
    email: "",
    teamID: "",
    role: "",
    continent: "",
    region: "",
  };
  const required = "* Campo obligatorio";
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, "Cantidad minima de caracteres es 4")
      .required(required),
    password: Yup.string()
      .min(6, "Cantidad minima de caracteres es 6")
      .required(required),
    email: Yup.string()
      .email("Debe utilizar un email valido")
      .required(required),
    //teamID: Yup.string().required(required),
    role: Yup.string().required(required),
    continent: Yup.string().required(required),
    region: Yup.string().required(required),
  });

  const onSubmit = (values) => {
    alert("sdss");
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, values, errors, touched, handleBlur } =
    formik;

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <div>
          <label>Nombre de usuario</label>
          <input
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.username && touched.username ? "error" : ""}
          />
          {errors.username && touched.username && (
            <span className="error-message">{errors.username}</span>
          )}{" "}
        </div>
        <div>
          <label htmlFor="">Contraseña</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "error" : ""}
          />
          {errors.password && touched.password && (
            <span className="error-message">{errors.password}</span>
          )}{" "}
        </div>
        <div>
          <label>Correo</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email ? "error" : ""}
          />
          {errors.email && touched.email && (
            <span className="error-message">{errors.email}</span>
          )}{" "}
        </div>
        <input type="hidden" name="teamID" value="sdfsadfgsadgfgsgdsga" />
        <div>
          <label>Role</label>
          <select
            name="role"
            value={values.role}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.role && touched.role ? "error" : ""}
          >
            <option value="">Seleccionar rol...</option>
            {data.Rol?.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.role && touched.role && (
            <span className="error-message">{errors.role}</span>
          )}{" "}
        </div>
        <div>
          <label>Continente</label>
          <select
            name="continent"
            value={values.continent}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.continent && touched.continent ? "error" : ""}
          >
            <option value="">Seleccionar continente...</option>
            {data.continente?.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.continent && touched.continent && (
            <span className="error-message">{errors.continent}</span>
          )}{" "}
        </div>
        {values.continent === "America" && (
          <div>
            <label>Region</label>
            <select
              name="region"
              value={values.region}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.region && touched.region ? "error" : ""}
            >
              <option value="">Seleccionar region...</option>
              {data.region?.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.region && touched.region && (
              <span className="error-message">{errors.region}</span>
            )}{" "}
          </div>
        )}

        <div>
          <button type="submit">Enviar</button>
        </div>
        <div>
          <Link to={"/login"}> Ir a Iniciar session </Link>
        </div>
      </form>
    </div>
  );
};
