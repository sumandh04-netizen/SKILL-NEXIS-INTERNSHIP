import { useState } from "react";

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [status, setStatus] =
    useState("Pending");

  const [priority, setPriority] =
    useState("Medium");

  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    await onTaskAdded({
      title,
      description,
      status,
      priority,
      dueDate,
    });

    setTitle("");
    setDescription("");
    setStatus("Pending");
    setPriority("Medium");
    setDueDate("");
  };

  return (
    <form
      className="task-form"
      onSubmit={handleSubmit}
    >

      <h2>Add New Task</h2>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        required
      />

      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
      >
        <option value="Pending">
          Pending
        </option>

        <option value="In Progress">
          In Progress
        </option>

        <option value="Completed">
          Completed
        </option>
      </select>

      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value)
        }
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) =>
          setDueDate(e.target.value)
        }
      />

      <button type="submit">
        Add Task
      </button>

    </form>
  );
}

export default TaskForm;