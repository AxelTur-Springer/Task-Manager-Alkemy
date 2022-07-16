import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Header } from "../../Header.js/Header";
import { TaskForm } from "../../TaskForm/TaskForm";
import { useResize } from "../../../hooks/useResize";
import { Card } from "../../Card/Card";
import debounce from "lodash.debounce";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Tasks.style.css";
import { getTasks } from "../../../store/actions/taskActions";
import {
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";

export const Tasks = () => {
  const [list, setList] = useState(null);
  const [renderList, setRenderList] = useState(null);
  const [tasksFromWho, setTasksFromWho] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const { isPhone } = useResize();
  const dispatch = useDispatch();

  // dispatching all tasks or only created by user
  useEffect(() => {
    dispatch(getTasks(tasksFromWho === "ME" ? "/me" : ""));
  }, [tasksFromWho]);

  // bringing tasks from store
  const { loading, error, tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  useEffect(() => {
    if (tasks?.length) {
      setList(tasks);
      setRenderList(tasks);
    }
  }, [tasks]);

  if (error) return <div>Hay un error</div>;

  //managing search
  useEffect(() => {
    if (searchTerm) {
      setRenderList(
        list.filter((data) =>
          data.title.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
      );
    } else {
      setRenderList(list);
    }
  }, [searchTerm]);

  const handleSearch = debounce((e) => {
    setSearchTerm(e?.target?.value);
  }, 1000);

  //rendering

  const renderAllCards = () => {
    return renderList?.map((data) => <Card key={data._id} data={data} />);
  };

  const renderColumnCards = (text) => {
    return renderList
      ?.filter((data) => data.status === text)
      .map((data) => <Card key={data._id} data={data} />);
  };

  //setting changes in input radius
  const handleChangeImportance = (e) => {
    if (e.currentTarget.value === "ALL") {
      setRenderList(list);
    } else {
      setRenderList(
        list.filter((data) => data.importance === e.currentTarget.value)
      );
    }
  };

  return (
    <>
      <Header />
      <main id="tasks">
        <TaskForm />
        <section className="wrapper_list">
          <div className="list_header">
            <h2>Mis Tareas</h2>
          </div>
          <div className="filters">
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-gripo-label"
                onChange={(e) => {
                  setTasksFromWho(e.currentTarget.value);
                }}
              >
                <FormControlLabel
                  value="ALL"
                  control={<Radio />}
                  label="Todas"
                />
                <FormControlLabel
                  value="ME"
                  control={<Radio />}
                  label="Mis tareas"
                />
              </RadioGroup>
            </FormControl>
            <div className="search">
              <input
                type="text"
                placeholder=" Buscar por titulo..."
                onChange={handleSearch}
              />
            </div>
            <select name="importance" onChange={handleChangeImportance}>
              <option value="">Selecionar una prioridad</option>
              <option value="ALL">Todas</option>
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
          </div>
          {isPhone ? (
            !renderList?.length ? (
              <div>No hay tareas creadas</div>
            ) : loading ? (
              <>
                <Skeleton height={90} />
                <Skeleton height={90} />
                <Skeleton height={90} />
              </>
            ) : (
              <div className="list phone">{renderAllCards()}</div>
            )
          ) : (
            <div className="list_group">
              {!renderList?.length ? (
                <div> No hay tareas creadas</div>
              ) : loading ? (
                <>
                  <Skeleton height={900} />
                  <Skeleton height={90} />
                  <Skeleton height={90} />
                </>
              ) : (
                <>
                  <div className="list">
                    <h4>Nuevas</h4>
                    {renderColumnCards("NEW")}
                  </div>
                  <div className="list">
                    <h4>En proceso</h4>
                    {renderColumnCards("IN PROGRESS")}
                  </div>
                  <div className="list">
                    <h4>Finalizadas</h4>
                    {renderColumnCards("FINISHED")}
                  </div>
                </>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
};
