import React from "react";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { resetTodo } from "../store/todoSlice";
const TodoList = () => {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  return (
    <>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
      <button onClick={() => dispatch(resetTodo())}>reset</button>
    </>
  );
};
export default TodoList;
