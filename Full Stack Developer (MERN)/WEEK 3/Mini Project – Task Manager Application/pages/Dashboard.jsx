import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api";

function Dashboard() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const [tasks, setTasks] = useState([]);

  const [filter, setFilter] = useState("All");

  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedTask, setSelectedTask] =
    useState(null);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
  });

  const [editTask, setEditTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
  });

  // =========================
  // FETCH TASKS
  // =========================

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await API.get("/tasks");

      setTasks(response.data);

    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        logout();
      } else {
        setMessage("Unable to load tasks.");
      }

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    fetchTasks();
  }, []);

  // =========================
  // ADD TASK
  // =========================

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!newTask.title.trim()) {
      setMessage("Please enter a task title.");
      return;
    }

    try {
      const response = await API.post(
        "/tasks",
        newTask
      );

      setTasks((previous) => [
        response.data,
        ...previous,
      ]);

      setNewTask({
        title: "",
        description: "",
        status: "Pending",
        priority: "Medium",
        dueDate: "",
      });

      setShowAddModal(false);

      setMessage("Task added successfully.");

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to add task."
      );
    }
  };

  // =========================
  // OPEN EDIT MODAL
  // =========================

  const openEditModal = (task) => {
    setSelectedTask(task);

    setEditTask({
      title: task.title,
      description: task.description || "",
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate || "",
    });

    setShowEditModal(true);
  };

  // =========================
  // UPDATE TASK
  // =========================

  const handleUpdateTask = async (e) => {
    e.preventDefault();

    try {
      const response = await API.put(
        `/tasks/${selectedTask._id}`,
        editTask
      );

      setTasks((previous) =>
        previous.map((task) =>
          task._id === selectedTask._id
            ? response.data
            : task
        )
      );

      setShowEditModal(false);

      setSelectedTask(null);

      setMessage("Task updated successfully.");

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to update task."
      );
    }
  };

  // =========================
  // DELETE TASK
  // =========================

  const handleDeleteTask = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await API.delete(`/tasks/${id}`);

      setTasks((previous) =>
        previous.filter(
          (task) => task._id !== id
        )
      );

      setMessage("Task deleted successfully.");

    } catch (error) {
      setMessage("Failed to delete task.");
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // =========================
  // FILTER
  // =========================

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter(
          (task) => task.status === filter
        );

  // =========================
  // STATISTICS
  // =========================

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const progressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  // =========================
  // PROFILE INITIAL
  // =========================

  const profileInitial =
    user.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="dashboard">

      {/* =========================
          HEADER
      ========================= */}

      <header className="dashboard-header">

        <div className="brand-section">

          <div className="brand-icon">
            ✓
          </div>

          <div>
            <h1>TaskFlow</h1>

            <span>
              Task Manager
            </span>
          </div>

        </div>

        <div className="header-actions">

          <div className="header-user">

            <div className="small-avatar">
              {profileInitial}
            </div>

            <span>
              {user.name || "User"}
            </span>

          </div>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* =========================
          MAIN
      ========================= */}

      <main className="dashboard-content">

        {/* Welcome section */}

        <section className="welcome-section">

          <div>

            <p className="welcome-label">
              DASHBOARD
            </p>

            <h2>
              Welcome back,{" "}
              {user.name || "User"} 👋
            </h2>

            <p>
              Manage your tasks and stay
              productive.
            </p>

          </div>

          <button
            className="add-task-main-btn"
            onClick={() =>
              setShowAddModal(true)
            }
          >
            <span>+</span>
            Add New Task
          </button>

        </section>


        {/* =========================
            PROFILE + STATISTICS
        ========================= */}

        <section className="top-dashboard-grid">

          {/* Profile Card */}

          <div className="profile-card">

            <div className="profile-background"></div>

            <div className="profile-content">

              <div className="profile-avatar">
                {profileInitial}
              </div>

              <h3>
                {user.name || "User"}
              </h3>

              <p className="profile-email">
                {user.email || "No email"}
              </p>

              <div className="profile-line"></div>

              <div className="profile-info">

                <div>
                  <span>
                    Account
                  </span>

                  <strong>
                    Task Manager User
                  </strong>
                </div>

                <div>
                  <span>
                    Total Tasks
                  </span>

                  <strong>
                    {totalTasks}
                  </strong>
                </div>

              </div>

            </div>

          </div>


          {/* Statistics */}

          <div className="statistics-grid">

            <div className="stat-card total">

              <div className="stat-icon">
                📋
              </div>

              <div>
                <span>
                  Total Tasks
                </span>

                <strong>
                  {totalTasks}
                </strong>
              </div>

            </div>


            <div className="stat-card pending">

              <div className="stat-icon">
                ⏳
              </div>

              <div>
                <span>
                  Pending
                </span>

                <strong>
                  {pendingTasks}
                </strong>
              </div>

            </div>


            <div className="stat-card progress">

              <div className="stat-icon">
                🔄
              </div>

              <div>
                <span>
                  In Progress
                </span>

                <strong>
                  {progressTasks}
                </strong>
              </div>

            </div>


            <div className="stat-card completed">

              <div className="stat-icon">
                ✓
              </div>

              <div>
                <span>
                  Completed
                </span>

                <strong>
                  {completedTasks}
                </strong>
              </div>

            </div>

          </div>

        </section>


        {/* =========================
            MESSAGE
        ========================= */}

        {message && (
          <div className="message-box">

            <span>✓</span>

            {message}

            <button
              onClick={() => setMessage("")}
            >
              ×
            </button>

          </div>
        )}


        {/* =========================
            TASK TOOLBAR
        ========================= */}

        <section className="task-toolbar">

          <div>

            <h2>
              My Tasks
            </h2>

            <p>
              Manage and organize your
              daily tasks.
            </p>

          </div>

          <div className="filter-area">

            <label>
              Filter:
            </label>

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
            >
              <option value="All">
                All Tasks
              </option>

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

          </div>

        </section>


        {/* =========================
            TASK LIST
        ========================= */}

        {loading ? (

          <div className="loading-box">
            <div className="spinner"></div>
            <p>Loading tasks...</p>
          </div>

        ) : filteredTasks.length === 0 ? (

          <div className="empty-task-box">

            <div className="empty-icon">
              📋
            </div>

            <h3>
              No tasks found
            </h3>

            <p>
              Start by adding your first
              task.
            </p>

            <button
              onClick={() =>
                setShowAddModal(true)
              }
            >
              + Add Task
            </button>

          </div>

        ) : (

          <div className="task-grid">

            {filteredTasks.map((task) => (

              <div
                className={`task-card ${task.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
                key={task._id}
              >

                <div className="task-card-top">

                  <span
                    className={`status-badge ${task.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {task.status}
                  </span>

                  <button
                    className="more-btn"
                    onClick={() =>
                      openEditModal(task)
                    }
                  >
                    ⋮
                  </button>

                </div>

                <h3>
                  {task.title}
                </h3>

                <p className="task-description">
                  {task.description ||
                    "No description provided."}
                </p>

                <div className="task-meta">

                  <span
                    className={`priority ${task.priority.toLowerCase()}`}
                  >
                    ● {task.priority}
                  </span>

                  {task.dueDate && (
                    <span>
                      📅 {task.dueDate}
                    </span>
                  )}

                </div>

                <div className="task-card-bottom">

                  <button
                    className="edit-btn"
                    onClick={() =>
                      openEditModal(task)
                    }
                  >
                    ✏ Edit
                  </button>

                  <button
                    className="delete-task-btn"
                    onClick={() =>
                      handleDeleteTask(
                        task._id
                      )
                    }
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>


      {/* =========================
          ADD TASK MODAL
      ========================= */}

      {showAddModal && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowAddModal(false)
          }
        >

          <div
            className="modal-box"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>
                <h2>
                  Add New Task
                </h2>

                <p>
                  Create a new task
                </p>
              </div>

              <button
                className="close-modal"
                onClick={() =>
                  setShowAddModal(false)
                }
              >
                ×
              </button>

            </div>

            <form
              onSubmit={handleAddTask}
              className="modal-form"
            >

              <label>
                Task Title
              </label>

              <input
                type="text"
                placeholder="Enter task title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    title: e.target.value,
                  })
                }
                required
              />

              <label>
                Description
              </label>

              <textarea
                placeholder="Enter task description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    description:
                      e.target.value,
                  })
                }
              />

              <div className="form-row">

                <div>
                  <label>
                    Status
                  </label>

                  <select
                    value={newTask.status}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        status:
                          e.target.value,
                      })
                    }
                  >
                    <option>
                      Pending
                    </option>

                    <option>
                      In Progress
                    </option>

                    <option>
                      Completed
                    </option>
                  </select>
                </div>

                <div>
                  <label>
                    Priority
                  </label>

                  <select
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        priority:
                          e.target.value,
                      })
                    }
                  >
                    <option>
                      Low
                    </option>

                    <option>
                      Medium
                    </option>

                    <option>
                      High
                    </option>
                  </select>
                </div>

              </div>

              <label>
                Due Date
              </label>

              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    dueDate:
                      e.target.value,
                  })
                }
              />

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >
                  Create Task
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* =========================
          EDIT TASK MODAL
      ========================= */}

      {showEditModal && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowEditModal(false)
          }
        >

          <div
            className="modal-box"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>
                <h2>
                  Edit Task
                </h2>

                <p>
                  Update task information
                </p>
              </div>

              <button
                className="close-modal"
                onClick={() =>
                  setShowEditModal(false)
                }
              >
                ×
              </button>

            </div>

            <form
              onSubmit={handleUpdateTask}
              className="modal-form"
            >

              <label>
                Task Title
              </label>

              <input
                type="text"
                value={editTask.title}
                onChange={(e) =>
                  setEditTask({
                    ...editTask,
                    title: e.target.value,
                  })
                }
                required
              />

              <label>
                Description
              </label>

              <textarea
                value={editTask.description}
                onChange={(e) =>
                  setEditTask({
                    ...editTask,
                    description:
                      e.target.value,
                  })
                }
              />

              <div className="form-row">

                <div>
                  <label>
                    Status
                  </label>

                  <select
                    value={editTask.status}
                    onChange={(e) =>
                      setEditTask({
                        ...editTask,
                        status:
                          e.target.value,
                      })
                    }
                  >
                    <option>
                      Pending
                    </option>

                    <option>
                      In Progress
                    </option>

                    <option>
                      Completed
                    </option>
                  </select>
                </div>

                <div>
                  <label>
                    Priority
                  </label>

                  <select
                    value={editTask.priority}
                    onChange={(e) =>
                      setEditTask({
                        ...editTask,
                        priority:
                          e.target.value,
                      })
                    }
                  >
                    <option>
                      Low
                    </option>

                    <option>
                      Medium
                    </option>

                    <option>
                      High
                    </option>
                  </select>
                </div>

              </div>

              <label>
                Due Date
              </label>

              <input
                type="date"
                value={editTask.dueDate}
                onChange={(e) =>
                  setEditTask({
                    ...editTask,
                    dueDate:
                      e.target.value,
                  })
                }
              />

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setShowEditModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >
                  Save Changes
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Dashboard;