import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector, useDispatch } from "react-redux";

import "react-loading-skeleton/dist/skeleton.css";
export const Card = ({
  deleteCard,
  editCardStatus,
  data: {
    _id,
    title,
    createdAt,
    user: { userName },
    description,
    status,
    importance,
  },
  data,
}) => {
  const [showMore, SetShowMore] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [width, setWidth] = useState("nada");

  const dateTime = new Date(createdAt).toLocaleString() + " hs.";

  const { loading } = useSelector((state) => {
    return state.tasksReducer;
  });
  useEffect(() => {
    if (!loading) {
      setClicked(false);
    }
  }, [loading]);

  const limitString = (str) => {
    if (str?.length > 370)
      return { string: str.slice(0, 167).concat("..."), addButton: true };
    return { string: str, addButton: false };
  };
  const OnclickEventsCard = (e) => {
    if (e.currentTarget.className === "close") {
      deleteCard(_id);
      setClicked(true);
      setWidth(e.currentTarget.parentNode.offsetHeight);
    } else {
      editCardStatus(data);
      setClicked(true);
      setWidth(e.currentTarget.parentNode.offsetHeight);
    }
  };
  return (
    <>
      {!clicked ? (
        <div className="card">
          <div
            className="close"
            onClick={(e) => {
              OnclickEventsCard(e);
            }}
          >
            {" "}
            x
          </div>
          <h3>{title}</h3>
          <h6>{dateTime}</h6>
          <h5>{userName}</h5>
          <button
            className={status.toLowerCase()}
            onClick={(e) => OnclickEventsCard(e)}
            type="button"
          >
            {status.toLowerCase()}
          </button>
          <button className={importance.toLowerCase()} type="button">
            {importance.toLowerCase()}
          </button>
          {!showMore && <p>{limitString(description).string}</p>}
          {showMore && (
            <>
              <p>{description}</p>{" "}
              <button
                type="button"
                onClick={() => {
                  SetShowMore(false);
                }}
              >
                ver menos
              </button>
            </>
          )}
          {!showMore && limitString(description).addButton && (
            <button
              type="button"
              onClick={() => {
                SetShowMore(true);
              }}
            >
              Ver mas
            </button>
          )}
        </div>
      ) : (
        <>
          <Skeleton height={width} />
        </>
      )}
    </>
  );
};
