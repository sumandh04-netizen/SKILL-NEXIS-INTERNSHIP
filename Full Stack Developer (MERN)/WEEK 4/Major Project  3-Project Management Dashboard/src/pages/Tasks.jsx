import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Trash2,
  Edit3,
  RefreshCw,
  AlertCircle,
  ClipboardList,
  CalendarDays,
} from "lucide-react";
import { toast } from "react-toastify";

import api from "../services/api";
import Modal from "../components/Modal";
import "./Tasks.css";

const INITIAL_FORM = {
  title: "",
  description: "",
  project: "",
  status: "TODO",
  priority: "MEDIUM",
  type: "FEATURE",
  progress: 0,
  dueDate: "",
  tags: [],
};

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState(INITIAL_FORM);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");

  /* =========================================================
     LOAD PROJECTS
  ========================================================= */

  const loadProjects = async () => {
    try {
      const response = await api.get("/projects");

      const projectList = Array.isArray(response.data)
        ? response.data
        : [];

      setProjects(projectList);

      setForm((previous) => ({
        ...previous,
        project:
          previous.project ||
          projectList[0]?._id ||
          "",
      }));
    } catch (error) {
      console.error(
        "Failed to load projects:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Could not load projects."
      );
    }
  };

  /* =========================================================
     LOAD TASKS
  ========================================================= */

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {};

      if (search.trim()) {
        params.search = search.trim();
      }

      const response = await api.get("/tasks", {
        params,
      });

      setTasks(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error(
        "Failed to load tasks:",
        error
      );

      const message =
        error.response?.data?.message ||
        "Could not load tasks.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    loadProjects();
    loadTasks();
  }, []);

  /* =========================================================
     SEARCH
  ========================================================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      loadTasks();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  /* =========================================================
     FORM HELPERS
  ========================================================= */

  const updateForm = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      ...INITIAL_FORM,
      project: projects[0]?._id || "",
    });
  };

  const openCreateModal = () => {
    setEditing(null);

    setForm({
      ...INITIAL_FORM,
      project: projects[0]?._id || "",
    });

    setOpen(true);
  };

  const closeModal = () => {
    if (saving) {
      return;
    }

    setOpen(false);
    setEditing(null);
    resetForm();
  };

  /* =========================================================
     CREATE / UPDATE TASK
  ========================================================= */

  const saveTask = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      toast.error("Please enter a task title.");
      return;
    }

    if (!form.project) {
      toast.error("Please select a project.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        project: form.project,
        status: form.status,
        priority: form.priority,
        type: form.type,
        progress: Number(form.progress),
        dueDate: form.dueDate || null,
        tags: Array.isArray(form.tags)
          ? form.tags
          : [],
      };

      if (editing) {
        await api.put(
          `/tasks/${editing}`,
          payload
        );

        toast.success(
          "Task updated successfully."
        );
      } else {
        await api.post("/tasks", payload);

        toast.success(
          "Task created successfully."
        );
      }

      setOpen(false);
      setEditing(null);
      resetForm();

      await loadTasks();
    } catch (error) {
      console.error(
        "Failed to save task:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Could not save task."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     EDIT TASK
  ========================================================= */

  const editTask = (task) => {
    setEditing(task._id);

    setForm({
      title: task.title || "",
      description: task.description || "",
      project:
        task.project?._id ||
        task.project ||
        "",
      status: task.status || "TODO",
      priority: task.priority || "MEDIUM",
      type: task.type || "FEATURE",
      progress: Number(task.progress || 0),
      dueDate: task.dueDate
        ? task.dueDate.slice(0, 10)
        : "",
      tags: Array.isArray(task.tags)
        ? task.tags
        : [],
    });

    setOpen(true);
  };

  /* =========================================================
     DELETE TASK
  ========================================================= */

  const deleteTask = async (taskId) => {
    const confirmed = window.confirm(
      "Delete this task? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(taskId);

      await api.delete(`/tasks/${taskId}`);

      setTasks((previous) =>
        previous.filter(
          (task) => task._id !== taskId
        )
      );

      toast.success(
        "Task deleted successfully."
      );
    } catch (error) {
      console.error(
        "Failed to delete task:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Could not delete task."
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* =========================================================
     PROGRESS CHANGE
  ========================================================= */

  const handleProgressChange = (value) => {
    const progress = Number(value);

    let status = form.status;

    if (progress === 100) {
      status = "DONE";
    } else if (
      progress > 0 &&
      progress < 100 &&
      status === "DONE"
    ) {
      status = "IN PROGRESS";
    } else if (
      progress === 0 &&
      status === "DONE"
    ) {
      status = "TODO";
    }

    setForm((previous) => ({
      ...previous,
      progress,
      status,
    }));
  };

  /* =========================================================
     STATUS CHANGE
  ========================================================= */

  const handleStatusChange = (status) => {
    let progress = Number(form.progress);

    if (status === "DONE") {
      progress = 100;
    }

    if (
      status === "TODO" &&
      progress === 100
    ) {
      progress = 0;
    }

    setForm((previous) => ({
      ...previous,
      status,
      progress,
    }));
  };

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  const formatDate = (date) => {
    if (!date) {
      return "No due date";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "No due date";
    }

    return parsedDate.toLocaleDateString(
      undefined,
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  /* =========================================================
     RENDER LOADING
  ========================================================= */

  const renderLoading = () => {
    return (
      <div className="task-list">
        {Array.from({ length: 6 }).map(
          (_, index) => (
            <div
              className="task-row task-row-skeleton"
              key={index}
            >
              <div className="task-skeleton-main">
                <div className="skeleton skeleton-small" />
                <div className="skeleton skeleton-title" />
                <div className="skeleton skeleton-line" />
              </div>

              <div className="skeleton skeleton-status" />

              <div className="skeleton skeleton-status" />

              <div className="skeleton skeleton-progress" />

              <div className="skeleton skeleton-actions" />
            </div>
          )
        )}
      </div>
    );
  };

  /* =========================================================
     RENDER ERROR
  ========================================================= */

  const renderError = () => {
    return (
      <div className="tasks-state tasks-error">
        <div className="tasks-state-icon">
          <AlertCircle size={28} />
        </div>

        <h3>Unable to load tasks</h3>

        <p>
          {error ||
            "Something went wrong while loading your tasks."}
        </p>

        <button
          type="button"
          className="secondary"
          onClick={loadTasks}
        >
          <RefreshCw size={16} />
          Try again
        </button>
      </div>
    );
  };

  /* =========================================================
     RENDER EMPTY
  ========================================================= */

  const renderEmpty = () => {
    return (
      <div className="tasks-state tasks-empty">
        <div className="tasks-empty-icon">
          <ClipboardList size={34} />
        </div>

        <h3>
          {search.trim()
            ? "No tasks found"
            : "No tasks yet"}
        </h3>

        <p>
          {search.trim()
            ? "Try changing your search or create a new task."
            : "Create your first task to start tracking your work."}
        </p>

        {!search.trim() && (
          <button
            type="button"
            className="primary"
            onClick={openCreateModal}
          >
            <Plus size={18} />
            Create task
          </button>
        )}
      </div>
    );
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="page tasks-page">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="page-title tasks-page-header">
        <div>
          <div className="tasks-eyebrow">
            <ClipboardList size={15} />
            WORK MANAGEMENT
          </div>

          <h1>Tasks</h1>

          <p>
            Track every piece of work in one place.
          </p>
        </div>

        <div className="tasks-header-actions">
          <button
            type="button"
            className="secondary"
            onClick={loadTasks}
            disabled={loading}
          >
            <RefreshCw
              size={17}
              className={
                loading
                  ? "tasks-spin"
                  : ""
              }
            />
            Refresh
          </button>

          <button
            type="button"
            className="primary"
            onClick={openCreateModal}
          >
            <Plus size={18} />
            New task
          </button>
        </div>
      </div>

      {/* =====================================================
          TOOLBAR
      ====================================================== */}

      <div className="toolbar tasks-toolbar">
        <div className="search-box tasks-search">
          <Search size={18} />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search tasks..."
          />

          {search && (
            <button
              type="button"
              className="search-clear"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <span className="tasks-count">
          {loading
            ? "Loading..."
            : `${tasks.length} ${
                tasks.length === 1
                  ? "task"
                  : "tasks"
              }`}
        </span>
      </div>

      {/* =====================================================
          TASK LIST
      ====================================================== */}

      {loading ? (
        renderLoading()
      ) : error ? (
        renderError()
      ) : tasks.length === 0 ? (
        renderEmpty()
      ) : (
        <div className="task-list">
          {tasks.map((task) => {
            const isDeleting =
              deletingId === task._id;

            const projectName =
              task.project?.name ||
              "No project";

            const progress = Math.min(
              100,
              Math.max(
                0,
                Number(task.progress || 0)
              )
            );

            return (
              <article
                className="task-row"
                key={task._id}
              >
                {/* Main */}

                <div className="task-main">
                  <span
                    className={`type ${(
                      task.type || "FEATURE"
                    ).toLowerCase()}`}
                  >
                    {task.type || "FEATURE"}
                  </span>

                  <div className="task-main-content">
                    <h3>{task.title}</h3>

                    <p>
                      {task.description ||
                        "No description"}
                    </p>

                    <div className="task-extra-info">
                      <span>
                        {projectName}
                      </span>

                      {task.dueDate && (
                        <span className="task-due-date">
                          <CalendarDays
                            size={13}
                          />
                          {formatDate(
                            task.dueDate
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status */}

                <span
                  className={`status ${(
                    task.status || "TODO"
                  )
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {task.status}
                </span>

                {/* Priority */}

                <span
                  className={`priority ${(
                    task.priority || "MEDIUM"
                  ).toLowerCase()}`}
                >
                  {task.priority}
                </span>

                {/* Progress */}

                <div className="task-progress">
                  <div className="task-progress-track">
                    <span
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <small>
                    {progress}%
                  </small>
                </div>

                {/* Actions */}

                <div className="row-actions">
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() =>
                      editTask(task)
                    }
                    disabled={isDeleting}
                    aria-label={`Edit ${task.title}`}
                    title="Edit task"
                  >
                    <Edit3 size={17} />
                  </button>

                  <button
                    type="button"
                    className="icon-btn danger"
                    onClick={() =>
                      deleteTask(task._id)
                    }
                    disabled={isDeleting}
                    aria-label={`Delete ${task.title}`}
                    title="Delete task"
                  >
                    {isDeleting ? (
                      <RefreshCw
                        size={17}
                        className="tasks-spin"
                      />
                    ) : (
                      <Trash2 size={17} />
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* =====================================================
          CREATE / EDIT MODAL
      ====================================================== */}

      <Modal
        open={open}
        onClose={closeModal}
        title={
          editing
            ? "Edit task"
            : "Create task"
        }
        size="large"
      >
        <form
          className="form tasks-form"
          onSubmit={saveTask}
        >
          {/* Title */}

          <label>
            Title

            <input
              type="text"
              required
              maxLength={150}
              value={form.title}
              onChange={(event) =>
                updateForm(
                  "title",
                  event.target.value
                )
              }
              placeholder="e.g. Build dashboard analytics"
              autoFocus
            />
          </label>

          {/* Description */}

          <label>
            Description

            <textarea
              rows={4}
              maxLength={1000}
              value={form.description}
              onChange={(event) =>
                updateForm(
                  "description",
                  event.target.value
                )
              }
              placeholder="Describe what needs to be done..."
            />

            <small className="form-help">
              {form.description.length}/1000
            </small>
          </label>

          {/* Project / Status */}

          <div className="two">
            <label>
              Project

              <select
                required
                value={form.project}
                onChange={(event) =>
                  updateForm(
                    "project",
                    event.target.value
                  )
                }
              >
                <option value="">
                  Select project
                </option>

                {projects.map((project) => (
                  <option
                    key={project._id}
                    value={project._id}
                  >
                    {project.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Status

              <select
                value={form.status}
                onChange={(event) =>
                  handleStatusChange(
                    event.target.value
                  )
                }
              >
                <option value="TODO">
                  TODO
                </option>

                <option value="IN PROGRESS">
                  IN PROGRESS
                </option>

                <option value="DONE">
                  DONE
                </option>
              </select>
            </label>
          </div>

          {/* Priority / Type */}

          <div className="two">
            <label>
              Priority

              <select
                value={form.priority}
                onChange={(event) =>
                  updateForm(
                    "priority",
                    event.target.value
                  )
                }
              >
                <option value="LOW">
                  LOW
                </option>

                <option value="MEDIUM">
                  MEDIUM
                </option>

                <option value="HIGH">
                  HIGH
                </option>

                <option value="URGENT">
                  URGENT
                </option>
              </select>
            </label>

            <label>
              Type

              <select
                value={form.type}
                onChange={(event) =>
                  updateForm(
                    "type",
                    event.target.value
                  )
                }
              >
                <option value="FEATURE">
                  FEATURE
                </option>

                <option value="BUG">
                  BUG
                </option>

                <option value="DESIGN">
                  DESIGN
                </option>
              </select>
            </label>
          </div>

          {/* Progress */}

          <label className="task-progress-field">
            <div className="range-label">
              <span>Progress</span>

              <strong>
                {form.progress}%
              </strong>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={form.progress}
              onChange={(event) =>
                handleProgressChange(
                  event.target.value
                )
              }
            />

            <div className="range-scale">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </label>

          {/* Due Date */}

          <label>
            Due date

            <input
              type="date"
              value={form.dueDate}
              onChange={(event) =>
                updateForm(
                  "dueDate",
                  event.target.value
                )
              }
            />
          </label>

          {/* Actions */}

          <div className="tasks-form-actions">
            <button
              type="button"
              className="secondary"
              onClick={closeModal}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary"
              disabled={saving}
            >
              {saving ? (
                <>
                  <RefreshCw
                    size={17}
                    className="tasks-spin"
                  />

                  {editing
                    ? "Saving..."
                    : "Creating..."}
                </>
              ) : (
                <>
                  {editing ? (
                    <Edit3 size={17} />
                  ) : (
                    <Plus size={17} />
                  )}

                  {editing
                    ? "Save changes"
                    : "Create task"}
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}