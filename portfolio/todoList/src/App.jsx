import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import TodoList from "./Components/TodoList";
import InputField from "./Components/InputField";
import { addNewTodo, requestTodos } from "./store/todoSlice";

function App() {
  const [text, setText] = useState("");
  const [prevText, setPrevText] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const { status, error } = useSelector((state) => state.todos);
  //
  useEffect(() => {
    dispatch(requestTodos());
  }, [dispatch]);
  //
  const addTask = () => {
    if (!text || text.trim() === "") {
      setText("");
      return false;
    } else if (text === prevText) {
      setText("");
      return false;
    } else if (todos.some((todo) => todo.text === text)) {
      setText("");
      return false;
    } else {
      dispatch(addNewTodo(text));
      setPrevText(text);
      setText("");
    }
  };
  //
  const keyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
      setText("");
    }
  };
  //
  return (
    <>
      <div className="App">
        <InputField
          text={text}
          handleAdd={addTask}
          press={keyPress}
          handleInput={setText}
        />
        {status === "loading" && <h2>Loading...</h2>}
        {error && <h2> An error occured:{error}</h2>}
        <TodoList />
      </div>
    </>
  );
}

export default App;
