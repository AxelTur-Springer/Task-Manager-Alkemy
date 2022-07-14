import "./TaskForm.style.css";
import { useFormik } from "formik";
import * as Yup from "yup";
export const TaskForm = () => {
  const initialValues = {
    title: "",
    status: "",
    priority: "",
    description: "",
  };

  const onSubmit = (values) => {
    alert("asd");
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(6, "aca va mensaje, min caracter is 6")
      .required("Aca va Error"),
    status: Yup.string().required("aca puede ir una variale tmb"),
    priority: Yup.string().required("*campo obli*"),
  });
  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, errors, touched, handleBlur } = formik;

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
              className={errors.title ? "error" : ""}
            />
          </div>
          {errors.title && touched.title && (
            <span className="error-message">{errors.title}</span>
          )}
          <div>
            <select
              name="status"
              className={errors.status ? "error" : ""}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Seleccionar un estado</option>
              <option value="new">Nuevo</option>
              <option value="inProcess">En proceso</option>
              <option value="finished">Terminado</option>
            </select>
          </div>
          {errors.status && touched.status && (
            <span className="error-message">{errors.status}</span>
          )}

          <div>
            <select
              name="priority"
              className={errors.priority ? "error" : ""}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Seleccionar una prioridad </option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>
          {errors.priority && touched.priority && (
            <span className="error-message">{errors.priority}</span>
          )}
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Crear</button>
      </form>
    </section>
  );
};
