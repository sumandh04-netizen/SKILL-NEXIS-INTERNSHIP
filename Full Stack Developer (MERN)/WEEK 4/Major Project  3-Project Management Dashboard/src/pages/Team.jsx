import { useEffect, useMemo, useState } from "react";
import {
  Users,
  RefreshCw,
  UserRound,
  ClipboardList,
  AlertCircle,
} from "lucide-react";

import api from "../services/api";
import "./Team.css";

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadTeam = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await api.get("/analytics");

      setMembers(response.data?.membersData || []);
    } catch (err) {
      console.error("Failed to load team data:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load team members. Please try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const totalMembers = members.length;

  const totalAssignedTasks = useMemo(() => {
    return members.reduce(
      (total, member) => total + Number(member.tasks || 0),
      0
    );
  }, [members]);

  const getInitials = (name = "") => {
    const words = name.trim().split(/\s+/);

    if (!words.length || !words[0]) {
      return "U";
    }

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  };

  const getWorkloadLabel = (tasks) => {
    const count = Number(tasks || 0);

    if (count === 0) {
      return "No tasks";
    }

    if (count <= 3) {
      return "Light workload";
    }

    if (count <= 7) {
      return "Moderate workload";
    }

    return "High workload";
  };

  const renderLoading = () => {
    return (
      <div className="team-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="member-card team-skeleton-card" key={index}>
            <div className="team-skeleton avatar large" />

            <div className="team-skeleton-content">
              <div className="team-skeleton team-skeleton-name" />
              <div className="team-skeleton team-skeleton-text" />
              <div className="team-skeleton team-skeleton-small" />
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="team-page page">
        <div className="team-header page-title">
          <div>
            <span className="team-eyebrow">WORKSPACE</span>
            <h1>Team</h1>
            <p>
              See workload distribution across your workspace.
            </p>
          </div>
        </div>

        {renderLoading()}
      </div>
    );
  }

  return (
    <div className="team-page page">
      <div className="team-header page-title">
        <div>
          <span className="team-eyebrow">WORKSPACE</span>

          <h1>Team</h1>

          <p>
            See workload distribution across your workspace.
          </p>
        </div>

        <button
          type="button"
          className="team-refresh-button"
          onClick={() => loadTeam(true)}
          disabled={refreshing}
        >
          <RefreshCw
            size={17}
            className={refreshing ? "team-spin" : ""}
          />

          <span>
            {refreshing ? "Refreshing..." : "Refresh"}
          </span>
        </button>
      </div>

      {error && (
        <div className="team-error">
          <AlertCircle size={20} />

          <div>
            <strong>Unable to load team</strong>
            <p>{error}</p>
          </div>

          <button
            type="button"
            onClick={() => loadTeam()}
          >
            Try again
          </button>
        </div>
      )}

      {!error && (
        <>
          <div className="team-summary-grid">
            <div className="team-summary-card">
              <div className="team-summary-icon">
                <Users size={20} />
              </div>

              <div>
                <span>Team members</span>
                <strong>{totalMembers}</strong>
              </div>
            </div>

            <div className="team-summary-card">
              <div className="team-summary-icon">
                <ClipboardList size={20} />
              </div>

              <div>
                <span>Assigned tasks</span>
                <strong>{totalAssignedTasks}</strong>
              </div>
            </div>

            <div className="team-summary-card">
              <div className="team-summary-icon">
                <UserRound size={20} />
              </div>

              <div>
                <span>Active workload</span>
                <strong>
                  {totalMembers > 0
                    ? Math.round(
                        totalAssignedTasks / totalMembers
                      )
                    : 0}
                </strong>

                <small>tasks / member</small>
              </div>
            </div>
          </div>

          <div className="team-section-header">
            <div>
              <h2>Team members</h2>
              <p>
                Workload based on currently assigned tasks.
              </p>
            </div>

            <span className="team-member-count">
              {totalMembers}{" "}
              {totalMembers === 1 ? "member" : "members"}
            </span>
          </div>

          <div className="team-grid">
            {members.map((member, index) => {
              const name = member.name || "Unknown member";
              const tasks = Number(member.tasks || 0);

              return (
                <article
                  className="member-card"
                  key={`${name}-${index}`}
                >
                  <div className="member-card-top">
                    <div className="avatar large">
                      {getInitials(name)}
                    </div>

                    <span className="member-index">
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="member-card-body">
                    <h3>{name}</h3>

                    <p className="member-role">
                      Team member
                    </p>

                    <div className="member-task-info">
                      <div>
                        <span>Assigned tasks</span>
                        <strong>{tasks}</strong>
                      </div>

                      <span
                        className={`workload-badge ${
                          tasks === 0
                            ? "empty"
                            : tasks <= 3
                            ? "light"
                            : tasks <= 7
                            ? "medium"
                            : "high"
                        }`}
                      >
                        {getWorkloadLabel(tasks)}
                      </span>
                    </div>

                    <div className="member-progress">
                      <div className="member-progress-track">
                        <div
                          className="member-progress-fill"
                          style={{
                            width: `${Math.min(
                              tasks * 10,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {!members.length && (
              <div className="team-empty">
                <div className="team-empty-icon">
                  <Users size={28} />
                </div>

                <h3>No assigned members yet</h3>

                <p>
                  Assign tasks to team members to see
                  workload distribution here.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}