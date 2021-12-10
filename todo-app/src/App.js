import { useEffect, useState } from "react";
import "./App.css";
import TodoAdd from "./components/TodoAdd";
import TodoList from "./components/TodoList";

function App() {
  const [todo, setTodo] = useState({ text: "" });
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
  const [filteredTodos, setFilteredTodos] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todoapp">
      <TodoAdd state={{ todo, setTodo, setTodos }} />
      <TodoList state={{ todos, setTodos, filteredTodos, setFilteredTodos }} />
    </div>
  );
}

export default App;
