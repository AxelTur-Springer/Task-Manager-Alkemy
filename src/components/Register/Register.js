import React, { useState } from "react";
import { useFormik } from "formik";

export const Register = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    alert("sdss");
  };
  const formik = useFormik({ initialValues, onSubmit });
  const { handleSubmit, handleChange, values, errors } = formik;
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <div>
          <label>Nombre de usuario</label>
          <input
            type="text"
            name="username"
            value={values.userName}
            onChange={handleChange}
          />
          {errors.userName && <div>{errors.userName}</div>}
        </div>
        <div>
          <label htmlFor="">Contraseña</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <div>{errors.password}</div>}
        </div>
        <div>
          <label>Correo</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <div>{errors.email}</div>}
        </div>
        <input type="hidden" name="teamID" value="sdfsadfgsadgfgsgdsga" />
        <div>
          <label>Role</label>
          <select name="role" value={values.role} onChange={handleChange}>
            <option value="Team Member">Team Member</option>
            <option value="Team Lider">Team Lider</option>
          </select>
          {errors.role && <div>{errors.role}</div>}
        </div>
        <div>
          <label>Continente</label>
          <select
            name="continent"
            value={values.continent}
            onChange={handleChange}
          >
            <option value="America">America</option>
            <option value="Europa">Europa</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.continent && <div>{errors.continent}</div>}
        </div>
        <div>
          <label>Region</label>
          <select name="region" value={values.region} onChange={handleChange}>
            <option value="Latam">Latam</option>
            <option value="Brasil">Brasil</option>
            <option value="America del Norte">America del Norte</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.region && <div>{errors.region}</div>}
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
};
