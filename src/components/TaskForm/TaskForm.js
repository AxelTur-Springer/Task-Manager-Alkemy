import "./TaskForm.style.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const { REACT_APP_API_ENDPOINT: API_END_POINT } = process.env;

export const TaskForm = () => {
  const initialValues = {
    title: "",
    status: "",
    importance: "",
    description: "",
  };

  const onSubmit = () => {
    console.log(values);
    fetch(API_END_POINT + "/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        task: values,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        resetForm();
        alert("tu tarea se crep");
      });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(6, "aca va mensaje, min caracter is 6")
      .required("Aca va Error"),
    status: Yup.string().required("aca puede ir una variale tmb"),
    importance: Yup.string().required("*campo obli*"),
    description: Yup.string().required("*campo obli*"),
  });
  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const {
    handleSubmit,
    handleChange,
    errors,
    touched,
    handleBlur,
    values,
    resetForm,
  } = formik;

  return (
    <section className="task-form">
      <h2>Crear Tarea</h2>
      <p>Crea tus tareas</p>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Titulo"
              value={values.title}
              className={errors.title && touched.title ? "error" : ""}
            />
          </div>
          {errors.title && touched.title && (
            <span className="error-message">{errors.title}</span>
          )}
          <div>
            <select
              name="status"
              className={errors.status && touched.status ? "error" : ""}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.status}
            >
              <option value="">Seleccionar un estado</option>
              <option value="NEW">Nueva</option>
              <option value="IN PROGRESS">En proceso</option>
              <option value="FINISHED">Terminada</option>
            </select>
          </div>
          {errors.status && touched.status && (
            <span className="error-message">{errors.status}</span>
          )}

          <div>
            <select
              name="importance"
              className={errors.importance && touched.importance ? "error" : ""}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.importance}
            >
              <option value="">Seleccionar una prioridad </option>
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
          </div>
          {errors.importance && touched.importance && (
            <span className="error-message">{errors.importance}</span>
          )}
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className={errors.description && touched.description ? "error" : ""}
            onBlur={handleBlur}
            value={values.description}
          />
        </div>
        {errors.description && touched.description && (
          <p className="error-message">{errors.description}</p>
        )}
        <button type="submit">Crear</button>
      </form>
    </section>
  );
};
