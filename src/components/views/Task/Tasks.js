import { Header } from "../../Header.js/Header";
import { TaskForm } from "../../TaskForm/TaskForm";
import { useResize } from "../../../hooks/useResize";
import { cardsData } from "./data";
import { Card } from "../../Card/Card";
import "./Tasks.style.css";
export const Tasks = () => {
  const { isPhone } = useResize();
  const limitString = (str) => {
    if (str.length > 370)
      return { string: str.slice(0, 367).concat("..."), addButton: true };
    return { string: str, addButton: false };
  };
  const renderAllCards = () => {
    return cardsData.map((data) => <Card key={data.id} data={data} />);
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
            <div className="list phone">{renderAllCards()}</div>
          ) : (
            <div className="list_group">
              <div className="list">
                <div className="card">
                  <div className="close">x</div>
                  <h3>Tarea 1</h3>
                  <h6>24/01/22</h6>
                  <h5>Axel Tur Springer</h5>
                  <button type="button">Nueva</button>
                  <button type="button">Alta</button>
                  <p>Descripcion Fake</p>
                </div>
              </div>
              <div className="list">
                <div className="card">
                  <div className="close">x</div>
                  <h3>Tarea 1</h3>
                  <h6>24/01/22</h6>
                  <h5>Axel Tur Springer</h5>
                  <button type="button">Nueva</button>
                  <button type="button">Alta</button>
                  <p>Descripcion Fake</p>
                </div>
              </div>
              <div className="list">
                <div className="card">
                  <div className="close">x</div>
                  <h3>Tarea 1</h3>
                  <h6>24/01/22</h6>
                  <h5>Axel Tur Springer</h5>
                  <button type="button">Nueva</button>
                  <button type="button">Alta</button>
                  <p>Descripcion Fake</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};
