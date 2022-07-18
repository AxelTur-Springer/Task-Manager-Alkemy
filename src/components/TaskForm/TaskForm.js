import "./TaskForm.style.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addTasks } from "../../store/actions/taskActions";
import { useSelector, useDispatch } from "react-redux";
import { height } from "@mui/system";

const { REACT_APP_API_ENDPOINT: API_END_POINT } = process.env;

export const TaskForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    title: "",
    status: "",
    importance: "",
    description: "",
  };

  const onSubmit = (values) => {
    dispatch(addTasks(values));
    resetForm();
  };
  const campoOblig = "*Campo obligatorio*";
  const validationSchema = Yup.object().shape({
    title: Yup.string().min(6, "min caracter is 6").required(campoOblig),
    status: Yup.string().required(campoOblig),
    importance: Yup.string().required(campoOblig),
    description: Yup.string().required(campoOblig),
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
        <div className="input-boxes">
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
            style={{ resize: "none", minHeight: "10em" }}
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
      <ToastContainer />
    </section>
  );
};
