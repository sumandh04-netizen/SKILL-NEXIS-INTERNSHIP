import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Plus,
  GripVertical,
  Sparkles,
  RefreshCw,
  Circle,
  Clock3,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import api from "../services/api";
import Modal from "../components/Modal";

/* =========================================================
   BOARD COLUMNS
========================================================= */

const BOARD_COLUMNS = [
  {
    key: "TODO",
    label: "TODO",
    icon: Circle,
  },
  {
    key: "IN PROGRESS",
    label: "IN PROGRESS",
    icon: Clock3,
  },
  {
    key: "DONE",
    label: "DONE",
    icon: CheckCircle2,
  },
];

/* =========================================================
   TASK PRIORITIES
========================================================= */

const PRIORITIES = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "URGENT",
];

/* =========================================================
   TASK TYPES
========================================================= */

const TASK_TYPES = [
  "FEATURE",
  "BUG",
  "DESIGN",
];

/* =========================================================
   BOARD PAGE
========================================================= */

export default function Board() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState("");

  const [open, setOpen] = useState(false);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState("MEDIUM");

  const [type, setType] =
    useState("FEATURE");

  const [draggedTask, setDraggedTask] =
    useState(null);

  const [dragOverColumn, setDragOverColumn] =
    useState("");

  /* =======================================================
     LOAD PROJECTS
  ======================================================= */

  async function loadProjects() {
    try {
      const response =
        await api.get("/projects");

      const projectList =
        Array.isArray(response.data)
          ? response.data
          : [];

      setProjects(projectList);

      setProject((currentProject) => {
        if (
          currentProject &&
          projectList.some(
            (item) =>
              item._id === currentProject
          )
        ) {
          return currentProject;
        }

        return projectList[0]?._id || "";
      });
    } catch (requestError) {
      console.error(
        "Failed to load projects:",
        requestError
      );

      setError(
        requestError.response?.data?.message ||
          "Unable to load projects."
      );
    }
  }

  /* =======================================================
     LOAD TASKS
  ======================================================= */

  async function loadTasks() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/tasks",
        {
          params: project
            ? {
                project,
              }
            : {},
        }
      );

      setTasks(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (requestError) {
      console.error(
        "Failed to load tasks:",
        requestError
      );

      setTasks([]);

      setError(
        requestError.response?.data?.message ||
          "Unable to load board tasks."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =======================================================
     INITIAL PROJECT LOAD
  ======================================================= */

  useEffect(() => {
    loadProjects();
  }, []);

  /* =======================================================
     LOAD TASKS WHEN PROJECT CHANGES
  ======================================================= */

  useEffect(() => {
    if (project) {
      loadTasks();
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [project]);

  /* =======================================================
     GROUP TASKS
  ======================================================= */

  const tasksByColumn = useMemo(() => {
    const grouped = {
      TODO: [],
      "IN PROGRESS": [],
      DONE: [],
    };

    tasks.forEach((task) => {
      if (grouped[task.status]) {
        grouped[task.status].push(task);
      } else {
        grouped.TODO.push(task);
      }
    });

    return grouped;
  }, [tasks]);

  /* =======================================================
     RESET FORM
  ======================================================= */

  function resetForm() {
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setType("FEATURE");
    setSaving(false);
  }

  /* =======================================================
     OPEN ADD TASK MODAL
  ======================================================= */

  function openAddTask() {
    resetForm();
    setOpen(true);
  }

  /* =======================================================
     CLOSE ADD TASK MODAL
  ======================================================= */

  function closeAddTask() {
    if (saving) {
      return;
    }

    setOpen(false);
    resetForm();
  }

  /* =======================================================
     ADD TASK
  ======================================================= */

  async function handleAddTask(event) {
    event.preventDefault();

    if (!project) {
      setError(
        "Please create or select a project first."
      );

      return;
    }

    const trimmedTitle =
      title.trim();

    if (!trimmedTitle) {
      setError(
        "Task title is required."
      );

      return;
    }

    try {
      setSaving(true);
      setError("");

      await api.post("/tasks", {
        title: trimmedTitle,
        description:
          description.trim(),
        project,
        status: "TODO",
        priority,
        type,
        progress: 0,
      });

      setOpen(false);
      resetForm();

      await loadTasks();
    } catch (requestError) {
      console.error(
        "Failed to create task:",
        requestError
      );

      setError(
        requestError.response?.data?.message ||
          "Unable to create task."
      );
    } finally {
      setSaving(false);
    }
  }

  /* =======================================================
     CHANGE TASK STATUS
  ======================================================= */

  async function moveTask(
    task,
    nextStatus
  ) {
    if (
      !task ||
      task.status === nextStatus
    ) {
      return;
    }

    const previousTasks = [...tasks];

    const nextProgress =
      nextStatus === "DONE"
        ? 100
        : task.progress === 100
        ? 0
        : task.progress || 0;

    /* Optimistic UI update */

    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item._id === task._id
          ? {
              ...item,
              status: nextStatus,
              progress: nextProgress,
            }
          : item
      )
    );

    try {
      await api.put(
        `/tasks/${task._id}`,
        {
          status: nextStatus,
          progress: nextProgress,
        }
      );
    } catch (requestError) {
      console.error(
        "Failed to move task:",
        requestError
      );

      setTasks(previousTasks);

      setError(
        requestError.response?.data?.message ||
          "Unable to update task status."
      );
    }
  }

  /* =======================================================
     DRAG START
  ======================================================= */

  function handleDragStart(
    event,
    task
  ) {
    setDraggedTask(task);

    event.dataTransfer.effectAllowed =
      "move";

    event.dataTransfer.setData(
      "text/plain",
      task._id
    );
  }

  /* =======================================================
     DRAG END
  ======================================================= */

  function handleDragEnd() {
    setDraggedTask(null);
    setDragOverColumn("");
  }

  /* =======================================================
     DRAG OVER COLUMN
  ======================================================= */

  function handleDragOver(
    event,
    column
  ) {
    event.preventDefault();

    event.dataTransfer.dropEffect =
      "move";

    setDragOverColumn(column);
  }

  /* =======================================================
     DRAG LEAVE
  ======================================================= */

  function handleDragLeave(
    event
  ) {
    if (
      event.currentTarget ===
      event.target
    ) {
      setDragOverColumn("");
    }
  }

  /* =======================================================
     DROP TASK
  ======================================================= */

  async function handleDrop(
    event,
    status
  ) {
    event.preventDefault();

    setDragOverColumn("");

    if (!draggedTask) {
      return;
    }

    await moveTask(
      draggedTask,
      status
    );

    setDraggedTask(null);
  }

  /* =======================================================
     REFRESH
  ======================================================= */

  async function handleRefresh() {
    await loadTasks();
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="page board-page">
      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="page-title board-page-title">
        <div>
          <div className="board-eyebrow">
            <Sparkles size={15} />
            WORKFLOW
          </div>

          <h1>Boards</h1>

          <p>
            Move work through your delivery
            pipeline.
          </p>
        </div>

        <div className="board-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw
              size={16}
              className={
                loading
                  ? "board-spin"
                  : ""
              }
            />

            Refresh
          </button>

          <select
            className="project-select"
            value={project}
            onChange={(event) =>
              setProject(
                event.target.value
              )
            }
            aria-label="Select project"
          >
            {projects.length === 0 && (
              <option value="">
                No projects available
              </option>
            )}

            {projects.map(
              (item) => (
                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.name}
                </option>
              )
            )}
          </select>

          <button
            type="button"
            className="primary"
            onClick={openAddTask}
            disabled={!project}
          >
            <Plus size={18} />
            Add task
          </button>
        </div>
      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div
          className="board-error"
          role="alert"
        >
          <AlertCircle size={18} />

          <span>{error}</span>

          <button
            type="button"
            onClick={() =>
              setError("")
            }
          >
            Dismiss
          </button>
        </div>
      )}

      {/* =================================================
          NO PROJECT
      ================================================= */}

      {!loading &&
        projects.length === 0 && (
          <section className="panel board-no-project">
            <div className="board-empty-icon">
              <Sparkles size={28} />
            </div>

            <h2>
              Create a project first
            </h2>

            <p>
              Your board needs a project
              before tasks can be added.
            </p>
          </section>
        )}

      {/* =================================================
          BOARD
      ================================================= */}

      {project && (
        <div className="board-grid">
          {BOARD_COLUMNS.map(
            (column) => {
              const Icon =
                column.icon;

              const columnTasks =
                tasksByColumn[
                  column.key
                ] || [];

              const isDragOver =
                dragOverColumn ===
                column.key;

              return (
                <section
                  className={`board-col ${
                    isDragOver
                      ? "drag-over"
                      : ""
                  }`}
                  key={column.key}
                  onDragOver={(event) =>
                    handleDragOver(
                      event,
                      column.key
                    )
                  }
                  onDragLeave={
                    handleDragLeave
                  }
                  onDrop={(event) =>
                    handleDrop(
                      event,
                      column.key
                    )
                  }
                >
                  {/* =====================================
                      COLUMN HEADER
                  ===================================== */}

                  <div className="board-head">
                    <div className="board-column-title">
                      <span
                        className={`status-dot ${column.key
                          .toLowerCase()
                          .replace(
                            /\s+/g,
                            "-"
                          )}`}
                      />

                      <Icon
                        size={16}
                        strokeWidth={2}
                      />

                      <b>
                        {column.label}
                      </b>

                      <em>
                        {
                          columnTasks.length
                        }
                      </em>
                    </div>

                    <button
                      type="button"
                      className="board-add-button"
                      onClick={
                        openAddTask
                      }
                      aria-label={`Add task to ${column.label}`}
                      disabled={!project}
                    >
                      <Plus size={17} />
                    </button>
                  </div>

                  {/* =====================================
                      TASKS
                  ===================================== */}

                  <div className="board-task-list">
                    {columnTasks.map(
                      (task) => (
                        <article
                          className={`task-card ${
                            draggedTask?._id ===
                            task._id
                              ? "is-dragging"
                              : ""
                          }`}
                          key={task._id}
                          draggable
                          onDragStart={(
                            event
                          ) =>
                            handleDragStart(
                              event,
                              task
                            )
                          }
                          onDragEnd={
                            handleDragEnd
                          }
                        >
                          {/* ===============================
                              TASK TOP
                          =============================== */}

                          <div className="task-card-top">
                            <span
                              className={`type ${String(
                                task.type ||
                                  "FEATURE"
                              ).toLowerCase()}`}
                            >
                              {task.type ||
                                "FEATURE"}
                            </span>

                            <span
                              className="drag-handle"
                              title="Drag task"
                            >
                              <GripVertical
                                size={17}
                              />
                            </span>
                          </div>

                          {/* ===============================
                              TITLE
                          =============================== */}

                          <h3>
                            {task.title}
                          </h3>

                          {/* ===============================
                              DESCRIPTION
                          =============================== */}

                          <p>
                            {task.description ||
                              "No description"}
                          </p>

                          {/* ===============================
                              TAGS
                          =============================== */}

                          {Array.isArray(
                            task.tags
                          ) &&
                            task.tags.length >
                              0 && (
                              <div className="task-tags">
                                {task.tags
                                  .slice(
                                    0,
                                    3
                                  )
                                  .map(
                                    (
                                      tag,
                                      index
                                    ) => (
                                      <span
                                        key={`${task._id}-tag-${index}`}
                                      >
                                        #
                                        {
                                          tag
                                        }
                                      </span>
                                    )
                                  )}
                              </div>
                            )}

                          {/* ===============================
                              CHECKLIST
                          =============================== */}

                          {Array.isArray(
                            task.checklist
                          ) &&
                            task.checklist.length >
                              0 && (
                              <div className="task-checklist">
                                <div className="task-checklist-header">
                                  <span>
                                    Checklist
                                  </span>

                                  <span>
                                    {
                                      task.checklist.filter(
                                        (
                                          item
                                        ) =>
                                          item.done
                                      ).length
                                    }
                                    /
                                    {
                                      task
                                        .checklist
                                        .length
                                    }
                                  </span>
                                </div>

                                <div className="card-progress">
                                  <span
                                    style={{
                                      width: `${
                                        task
                                          .checklist
                                          .length ===
                                        0
                                          ? 0
                                          : (
                                              task.checklist.filter(
                                                (
                                                  item
                                                ) =>
                                                  item.done
                                              ).length /
                                              task
                                                .checklist
                                                .length
                                            ) *
                                            100
                                      }%`,
                                    }}
                                  />
                                </div>
                              </div>
                            )}

                          {/* ===============================
                              TASK PROGRESS
                          =============================== */}

                          <div className="task-progress-label">
                            <span>
                              Progress
                            </span>

                            <strong>
                              {
                                task.progress
                              }
                              %
                            </strong>
                          </div>

                          <div className="card-progress">
                            <span
                              style={{
                                width: `${Math.min(
                                  Math.max(
                                    Number(
                                      task.progress ||
                                        0
                                    ),
                                    0
                                  ),
                                  100
                                )}%`,
                              }}
                            />
                          </div>

                          {/* ===============================
                              FOOTER
                          =============================== */}

                          <div className="card-footer">
                            <span
                              className={`priority ${String(
                                task.priority ||
                                  "MEDIUM"
                              ).toLowerCase()}`}
                            >
                              {task.priority ||
                                "MEDIUM"}
                            </span>

                            <select
                              value={
                                task.status
                              }
                              onChange={(
                                event
                              ) =>
                                moveTask(
                                  task,
                                  event
                                    .target
                                    .value
                                )
                              }
                              aria-label={`Change status for ${task.title}`}
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
                          </div>
                        </article>
                      )
                    )}

                    {/* =================================
                        EMPTY COLUMN
                    ================================= */}

                    {!loading &&
                      columnTasks.length ===
                        0 && (
                        <div className="board-empty">
                          <Sparkles
                            size={22}
                          />

                          <p>
                            No tasks here
                          </p>

                          <small>
                            Drag work into
                            this stage.
                          </small>

                          <button
                            type="button"
                            onClick={
                              openAddTask
                            }
                          >
                            <Plus size={15} />
                            Add task
                          </button>
                        </div>
                      )}

                    {/* =================================
                        LOADING
                    ================================= */}

                    {loading && (
                      <>
                        <div className="task-skeleton" />
                        <div className="task-skeleton" />
                      </>
                    )}
                  </div>
                </section>
              );
            }
          )}
        </div>
      )}

      {/* =================================================
          ADD TASK MODAL
      ================================================= */}

      <Modal
        open={open}
        onClose={closeAddTask}
        title="Quick add task"
        size="medium"
      >
        <form
          className="form board-task-form"
          onSubmit={handleAddTask}
        >
          {/* =============================================
              TITLE
          ============================================= */}

          <label>
            Task title

            <input
              autoFocus
              required
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value
                )
              }
              placeholder="What needs to be done?"
              maxLength={200}
              disabled={saving}
            />
          </label>

          {/* =============================================
              DESCRIPTION
          ============================================= */}

          <label>
            Description

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              placeholder="Add a short description..."
              rows={4}
              maxLength={5000}
              disabled={saving}
            />
          </label>

          {/* =============================================
              PRIORITY
          ============================================= */}

          <label>
            Priority

            <select
              value={priority}
              onChange={(event) =>
                setPriority(
                  event.target.value
                )
              }
              disabled={saving}
            >
              {PRIORITIES.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>
          </label>

          {/* =============================================
              TYPE
          ============================================= */}

          <label>
            Task type

            <select
              value={type}
              onChange={(event) =>
                setType(
                  event.target.value
                )
              }
              disabled={saving}
            >
              {TASK_TYPES.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>
          </label>

          {/* =============================================
              SUBMIT
          ============================================= */}

          <button
            type="submit"
            className="primary wide"
            disabled={
              saving ||
              !title.trim() ||
              !project
            }
          >
            {saving ? (
              <>
                <RefreshCw
                  size={16}
                  className="board-spin"
                />
                Adding task...
              </>
            ) : (
              <>
                <Plus size={17} />
                Add task
              </>
            )}
          </button>
        </form>
      </Modal>
    </div>
  );
}