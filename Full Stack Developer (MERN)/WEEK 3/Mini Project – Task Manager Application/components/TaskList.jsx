function TaskList({
  tasks,
  onUpdate,
  onDelete,
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty">
        <p>No tasks found.</p>
      </div>
    );
  }

  return (
    <div className="task-list">

      {tasks.map((task) => (
        <div
          className="task-card"
          key={task._id}
        >

          <div className="task-header">

            <h3>{task.title}</h3>

            <button
              className="delete-btn"
              onClick={() =>
                onDelete(task._id)
              }
            >
              Delete
            </button>

          </div>

          <p>
            {task.description ||
              "No description"}
          </p>

          <div className="task-details">

            <span>
              Status:
              <strong>
                {" "}{task.status}
              </strong>
            </span>

            <span>
              Priority:
              <strong>
                {" "}{task.priority}
              </strong>
            </span>

            {task.dueDate && (
              <span>
                Due Date:
                <strong>
                  {" "}{task.dueDate}
                </strong>
              </span>
            )}

          </div>

          <div className="task-actions">

            <select
              value={task.status}
              onChange={(e) =>
                onUpdate(task._id, {
                  status: e.target.value,
                })
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
              value={task.priority}
              onChange={(e) =>
                onUpdate(task._id, {
                  priority: e.target.value,
                })
              }
            >
              <option value="Low">
                Low
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="High">
                High
              </option>
            </select>

          </div>

        </div>
      ))}

    </div>
  );
}

export default TaskList;