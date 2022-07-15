import { useState, useEffect } from "react";
import { Header } from "../../Header.js/Header";
import { TaskForm } from "../../TaskForm/TaskForm";
import { useResize } from "../../../hooks/useResize";
import { Card } from "../../Card/Card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Tasks.style.css";
const { REACT_APP_API_ENDPOINT: API_END_POINT } = process.env;

export const Tasks = () => {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPhone } = useResize();

  useEffect(() => {
    setLoading(true);
    fetch(API_END_POINT + "/task", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setList(data.result);
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      });
  }, []);
  const limitString = (str) => {
    if (str.length > 370)
      return { string: str.slice(0, 367).concat("..."), addButton: true };
    return { string: str, addButton: false };
  };
  const renderAllCards = () => {
    return list?.map((data) => <Card key={data._id} data={data} />);
  };
  const renderNewCards = () => {
    return list
      ?.filter((data) => data.status === "NEW")
      .map((data) => <Card key={data._id} data={data} />);
  };
  const renderInProgressCards = () => {
    return list
      ?.filter((data) => data.status === "IN PROGRESS")
      .map((data) => <Card key={data._id} data={data} />);
  };
  const renderFinishedCards = () => {
    return list
      ?.filter((data) => data.status === "FINISHED")
      .map((data) => <Card key={data._id} data={data} />);
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
          {isPhone ? (
            !list?.length ? (
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
              {!list?.length ? (
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
                    {renderNewCards()}
                  </div>
                  <div className="list">
                    <h4>En proceso</h4>
                    {renderInProgressCards()}
                  </div>
                  <div className="list">
                    <h4>Finalizadas</h4>
                    {renderFinishedCards()}
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
