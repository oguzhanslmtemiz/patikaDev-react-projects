import Status from "./Status";

export default function TodoList({ state }) {
  const handleCheck = (e, id) => {
    state.setTodos((prevState) => {
      prevState.find((todo) => todo.id === id).isChecked = e.target.checked;
      return [...prevState];
    });
  };

  const handleDelete = (id) => {
    state.setTodos((prevState) => {
      return prevState.filter((todo) => todo.id !== id);
    });
  };

  const todoList = state.filteredTodos || state.todos;

  return (
    <>
      <main className="main">
        <span className="sign" />
        <ul className="todo-list">
          {todoList.map((todo) => (
            <li
              className={todo.isChecked ? "completed" : undefined}
              key={todo.id}
            >
              <div className="view">
                <input
                  type="checkbox"
                  className="toggle"
                  checked={todo.isChecked}
                  onChange={(e) => handleCheck(e, todo.id)}
                />
                <label>{todo.text}</label>
                <button
                  className="destroy"
                  onClick={() => handleDelete(todo.id)}
                ></button>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <Status state={state} />
    </>
  );
}
