import { useEffect, useState } from "react";
import {
  Plus,
  FolderKanban,
  Trash2,
  RefreshCw,
  AlertCircle,
  Users,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";
import Modal from "../components/Modal";
import "./Projects.css";

const INITIAL_FORM = {
  name: "",
  description: "",
  color: "#6366f1",
};

const PROJECT_COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f43f5e",
  "#f97316",
  "#eab308",
  "#10b981",
  "#06b6d4",
];

export default function Projects() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState(INITIAL_FORM);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/projects");

      setItems(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error("Failed to load projects:", error);

      const message =
        error.response?.data?.message ||
        "Could not load projects.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const updateForm = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const openCreateModal = () => {
    setForm(INITIAL_FORM);
    setOpen(true);
  };

  const closeCreateModal = () => {
    if (creating) {
      return;
    }

    setOpen(false);
    setForm(INITIAL_FORM);
  };

  const addProject = async (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const description = form.description.trim();

    if (!name) {
      toast.error("Please enter a project name.");
      return;
    }

    try {
      setCreating(true);

      await api.post("/projects", {
        name,
        description,
        color: form.color,
      });

      toast.success("Project created successfully.");

      setForm(INITIAL_FORM);
      setOpen(false);

      await loadProjects();
    } catch (error) {
      console.error("Failed to create project:", error);

      toast.error(
        error.response?.data?.message ||
          "Could not create project."
      );
    } finally {
      setCreating(false);
    }
  };

  const deleteProject = async (projectId) => {
    const confirmed = window.confirm(
      "Delete this project and all of its tasks?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(projectId);

      await api.delete(`/projects/${projectId}`);

      setItems((previous) =>
        previous.filter(
          (project) => project._id !== projectId
        )
      );

      toast.success("Project deleted successfully.");
    } catch (error) {
      console.error("Failed to delete project:", error);

      toast.error(
        error.response?.data?.message ||
          "Could not delete project."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const openProject = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const renderLoadingState = () => {
    return (
      <div className="project-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            className="project-card project-card-skeleton"
            key={index}
          >
            <div className="project-cover skeleton" />

            <div className="project-body">
              <div className="project-skeleton-content">
                <div className="skeleton skeleton-title" />
                <div className="skeleton skeleton-line" />
                <div className="skeleton skeleton-line short" />
              </div>
            </div>

            <div className="project-meta">
              <div className="skeleton skeleton-meta" />
              <div className="skeleton skeleton-meta small" />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderErrorState = () => {
    return (
      <div className="projects-state projects-error">
        <div className="projects-state-icon">
          <AlertCircle size={28} />
        </div>

        <h3>Unable to load projects</h3>

        <p>
          {error ||
            "Something went wrong while loading your projects."}
        </p>

        <button
          type="button"
          className="secondary"
          onClick={loadProjects}
        >
          <RefreshCw size={16} />
          Try again
        </button>
      </div>
    );
  };

  const renderEmptyState = () => {
    return (
      <div className="projects-state projects-empty">
        <div className="projects-empty-icon">
          <FolderKanban size={34} />
        </div>

        <h3>No projects yet</h3>

        <p>
          Create your first project to organize your
          tasks and team work.
        </p>

        <button
          type="button"
          className="primary"
          onClick={openCreateModal}
        >
          <Plus size={18} />
          Create project
        </button>
      </div>
    );
  };

  return (
    <div className="page projects-page">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="page-title projects-page-header">
        <div>
          <div className="projects-eyebrow">
            <FolderKanban size={15} />
            PROJECT WORKSPACE
          </div>

          <h1>Projects</h1>

          <p>
            Organize work into focused project spaces.
          </p>
        </div>

        <div className="projects-header-actions">
          <button
            type="button"
            className="secondary"
            onClick={loadProjects}
            disabled={loading}
          >
            <RefreshCw
              size={17}
              className={
                loading ? "projects-spin" : ""
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
            New project
          </button>
        </div>
      </div>

      {/* =====================================================
          PROJECT SUMMARY
      ====================================================== */}

      {!loading && !error && (
        <div className="projects-summary">
          <div className="projects-summary-card">
            <div className="projects-summary-icon">
              <FolderKanban size={19} />
            </div>

            <div>
              <span>Total projects</span>
              <strong>{items.length}</strong>
            </div>
          </div>

          <div className="projects-summary-card">
            <div className="projects-summary-icon">
              <Users size={19} />
            </div>

            <div>
              <span>Active workspace</span>
              <strong>
                {items.length > 0 ? "Ready" : "Empty"}
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          CONTENT
      ====================================================== */}

      {loading ? (
        renderLoadingState()
      ) : error ? (
        renderErrorState()
      ) : items.length === 0 ? (
        renderEmptyState()
      ) : (
        <div className="project-grid">
          {items.map((project) => {
            const memberCount =
              project.members?.length || 1;

            const isDeleting =
              deletingId === project._id;

            return (
              <article
                className="project-card"
                key={project._id}
              >
                {/* Project cover */}

                <button
                  type="button"
                  className="project-cover"
                  style={{
                    background: project.color || "#6366f1",
                  }}
                  onClick={() =>
                    openProject(project._id)
                  }
                  aria-label={`Open ${project.name}`}
                >
                  <div className="project-cover-overlay" />

                  <div className="project-cover-icon">
                    <FolderKanban size={27} />
                  </div>

                  <span className="project-cover-label">
                    PROJECT
                  </span>
                </button>

                {/* Project content */}

                <div className="project-body">
                  <div className="project-content">
                    <button
                      type="button"
                      className="project-name-button"
                      onClick={() =>
                        openProject(project._id)
                      }
                    >
                      <h3>{project.name}</h3>
                    </button>

                    <p>
                      {project.description ||
                        "No description yet."}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="icon-btn danger"
                    onClick={() =>
                      deleteProject(project._id)
                    }
                    disabled={isDeleting}
                    aria-label={`Delete ${project.name}`}
                    title="Delete project"
                  >
                    {isDeleting ? (
                      <RefreshCw
                        size={17}
                        className="projects-spin"
                      />
                    ) : (
                      <Trash2 size={17} />
                    )}
                  </button>
                </div>

                {/* Project metadata */}

                <div className="project-meta">
                  <span className="project-member-count">
                    <Users size={14} />
                    {memberCount}{" "}
                    {memberCount === 1
                      ? "member"
                      : "members"}
                  </span>

                  <span className="project-type">
                    TaskFlow project
                  </span>

                  <button
                    type="button"
                    className="project-open-button"
                    onClick={() =>
                      openProject(project._id)
                    }
                  >
                    Open
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* =====================================================
          CREATE PROJECT MODAL
      ====================================================== */}

      <Modal
        open={open}
        onClose={closeCreateModal}
        title="Create project"
        size="medium"
      >
        <form
          className="form projects-form"
          onSubmit={addProject}
        >
          <div className="form-intro">
            <div className="form-intro-icon">
              <FolderKanban size={20} />
            </div>

            <div>
              <h3>New project</h3>

              <p>
                Create a focused workspace for your
                team's work.
              </p>
            </div>
          </div>

          <label>
            Project name

            <input
              type="text"
              required
              maxLength={100}
              value={form.name}
              onChange={(event) =>
                updateForm(
                  "name",
                  event.target.value
                )
              }
              placeholder="e.g. Website Redesign"
              autoFocus
            />
          </label>

          <label>
            Description

            <textarea
              rows={4}
              maxLength={500}
              value={form.description}
              onChange={(event) =>
                updateForm(
                  "description",
                  event.target.value
                )
              }
              placeholder="Describe what this project is about..."
            />

            <small className="form-help">
              {form.description.length}/500
            </small>
          </label>

          <div className="color-field">
            <label>
              Brand color
            </label>

            <div className="project-color-picker">
              <input
                type="color"
                value={form.color}
                onChange={(event) =>
                  updateForm(
                    "color",
                    event.target.value
                  )
                }
                aria-label="Project brand color"
              />

              <span>{form.color}</span>
            </div>

            <div className="project-color-options">
              {PROJECT_COLORS.map((color) => (
                <button
                  type="button"
                  key={color}
                  className={`color-option ${
                    form.color.toLowerCase() ===
                    color.toLowerCase()
                      ? "selected"
                      : ""
                  }`}
                  style={{
                    backgroundColor: color,
                  }}
                  onClick={() =>
                    updateForm("color", color)
                  }
                  aria-label={`Use ${color}`}
                />
              ))}
            </div>
          </div>

          <div className="projects-form-actions">
            <button
              type="button"
              className="secondary"
              onClick={closeCreateModal}
              disabled={creating}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary"
              disabled={creating}
            >
              {creating ? (
                <>
                  <RefreshCw
                    size={17}
                    className="projects-spin"
                  />
                  Creating...
                </>
              ) : (
                <>
                  <Plus size={17} />
                  Create project
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}