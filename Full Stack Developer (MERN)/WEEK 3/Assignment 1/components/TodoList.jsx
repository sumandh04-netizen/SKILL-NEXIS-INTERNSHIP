function TodoList({
  todos,
  onDelete,
  onToggle,
  onEdit
}) {

  if (todos.length === 0) {

    return (
      <p className="empty">
        No todos found.
      </p>
    );
  }

  return (

    <div className="todo-list">

      {todos.map((todo) => (

        <div
          className={`todo-card ${
            todo.completed
              ? "completed"
              : ""
          }`}
          key={todo.id}
        >

          <div>

            <h3>
              {todo.title}
            </h3>

            <p>
              {todo.description}
            </p>

            <small>
              Status:
              {" "}
              {todo.completed
                ? "Completed"
                : "Pending"}
            </small>

          </div>

          <div className="todo-buttons">

            <button
              onClick={() =>
                onToggle(todo)
              }
            >
              {todo.completed
                ? "Undo"
                : "Complete"}
            </button>

            <button
              onClick={() =>
                onEdit(todo)
              }
            >
              Edit
            </button>

            <button
              onClick={() =>
                onDelete(todo.id)
              }
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>
  );
}

export default TodoList;