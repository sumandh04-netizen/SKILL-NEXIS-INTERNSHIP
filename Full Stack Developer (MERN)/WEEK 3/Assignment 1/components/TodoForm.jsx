import { useState } from "react";

function TodoForm({ onAdd }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    onAdd({
      title,
      description
    });

    setTitle("");
    setDescription("");
  };

  return (

    <form
      className="todo-form"
      onSubmit={handleSubmit}
    >

      <input
        type="text"
        placeholder="Todo title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <button type="submit">
        Add Todo
      </button>

    </form>
  );
}

export default TodoForm;