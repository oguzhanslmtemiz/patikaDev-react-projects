import { useEffect, useState } from "react";

export default function Status({ state }) {
  let countOfActiveTodos = state.todos.filter((todo) => !todo.isChecked).length;
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    if (filterStatus === "Active") {
      handleFilterActive();
    } else if (filterStatus === "Completed") {
      handleFilterCompleted();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.todos]);

  const handleFilterAll = () => {
    setFilterStatus("All");
    state.setFilteredTodos(null);
  };
  const handleFilterActive = () => {
    setFilterStatus("Active");
    state.setFilteredTodos(state.todos.filter((todo) => !todo.isChecked));
  };
  const handleFilterCompleted = () => {
    setFilterStatus("Completed");
    state.setFilteredTodos(state.todos.filter((todo) => todo.isChecked));
  };
  const handleClear = () => {
    state.setTodos((prevState) => {
      return prevState.filter((todo) => todo.isChecked === false);
    });
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{countOfActiveTodos}</strong> items left
      </span>
      <ul className="filters">
        <li>
          <a
            href="/#"
            className={filterStatus === "All" ? "selected" : undefined}
            onClick={handleFilterAll}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="/#"
            className={filterStatus === "Active" ? "selected" : undefined}
            onClick={handleFilterActive}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="/#"
            className={filterStatus === "Completed" ? "selected" : undefined}
            onClick={handleFilterCompleted}
          >
            Completed
          </a>
        </li>
      </ul>
      <button className="clear-completed" onClick={handleClear}>
        Clear completed
      </button>
    </footer>
  );
}
