import { useState, useEffect } from "react";
import { Header } from "../../Header.js/Header";
import { TaskForm } from "../../TaskForm/TaskForm";
import { useResize } from "../../../hooks/useResize";
import { Card } from "../../Card/Card";
import debounce from "lodash.debounce";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Tasks.style.css";
import {
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";

const { REACT_APP_API_ENDPOINT: API_END_POINT } = process.env;

export const Tasks = () => {
  const [list, setList] = useState(null);
  const [renderList, setRenderList] = useState(null);
  const [tasksFromWho, setTasksFromWho] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { isPhone } = useResize();

  useEffect(() => {
    setLoading(true);
    fetch(`${API_END_POINT}/task${tasksFromWho === "ME" ? "/me" : ""}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setList(data.result);
        setRenderList(data.result);
        setLoading(false);
      });
  }, [tasksFromWho]);

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

  const limitString = (str) => {
    if (str.length > 370)
      return { string: str.slice(0, 367).concat("..."), addButton: true };
    return { string: str, addButton: false };
  };

  const renderAllCards = () => {
    return renderList?.map((data) => <Card key={data._id} data={data} />);
  };

  const renderColumnCards = (text) => {
    return renderList
      ?.filter((data) => data.status === text)
      .map((data) => <Card key={data._id} data={data} />);
  };

  const handleChangeImportance = (e) => {
    if (e.currentTarget.value === "ALL") {
      setRenderList(list);
    } else {
      setRenderList(
        list.filter((data) => data.importance === e.currentTarget.value)
      );
    }
  };

  const handleSearch = debounce((e) => {
    setSearchTerm(e?.target?.value);
  }, 1000);

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
