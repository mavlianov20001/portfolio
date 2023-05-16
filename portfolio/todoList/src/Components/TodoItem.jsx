import React from "react";
import { useDispatch } from "react-redux";
import {
  removeTodo,
  deleteTodo,
  toggleComplete,
  toggleStatus,
} from "../store/todoSlice";
const TodoItem = ({ id, title, completed, text }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteTodo(id));
      dispatch(removeTodo(id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <li>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => dispatch(toggleStatus(id))}
        />

        <p className="title">{title}</p>
        <p className="text">{text}</p>

        <button className="delete" onClick={handleDelete}>
          &times;
        </button>
      </li>
    </>
  );
};

export default TodoItem;
