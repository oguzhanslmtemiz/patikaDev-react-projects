export default function TodoAdd({ state }) {
  const handleChange = (e) => {
    state.setTodo({
      text: e.target.value,
      isChecked: false,
      id: new Date().getTime(),
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    state.setTodos((prevState) => [...prevState, state.todo]);
    state.setTodo({ text: "" });
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={state.todo.text}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}
