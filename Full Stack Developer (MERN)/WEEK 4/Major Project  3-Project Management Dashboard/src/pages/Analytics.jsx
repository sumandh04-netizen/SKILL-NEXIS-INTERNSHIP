import { useEffect, useMemo, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

import {
  BarChart3,
  CheckCircle2,
  ClipboardList,
  FolderKanban,
  RefreshCw,
  Users,
} from "lucide-react";

import api from "../services/api";

/* =========================================================
   ANALYTICS PAGE
========================================================= */

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =======================================================
     LOAD ANALYTICS
  ======================================================= */

  async function loadAnalytics() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/analytics");

      setData(response.data);
    } catch (requestError) {
      console.error(
        "Failed to load analytics:",
        requestError
      );

      setError(
        requestError.response?.data?.message ||
          "Unable to load analytics data."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAnalytics();
  }, []);

  /* =======================================================
     PIE CHART DATA
  ======================================================= */

  const priorityData = useMemo(() => {
    if (!Array.isArray(data?.byPriority)) {
      return [];
    }

    return data.byPriority;
  }, [data]);

  /* =======================================================
     MEMBER DATA
  ======================================================= */

  const memberData = useMemo(() => {
    if (!Array.isArray(data?.membersData)) {
      return [];
    }

    return data.membersData;
  }, [data]);

  /* =======================================================
     STATUS DATA
  ======================================================= */

  const statusData = useMemo(() => {
    if (!Array.isArray(data?.byStatus)) {
      return [];
    }

    return data.byStatus;
  }, [data]);

  /* =======================================================
     PROJECT PROGRESS DATA
  ======================================================= */

  const projectProgressData = useMemo(() => {
    if (!Array.isArray(data?.projectProgress)) {
      return [];
    }

    return data.projectProgress;
  }, [data]);

  /* =======================================================
     PIE COLORS
  ======================================================= */

  const priorityColors = [
    "#94a3b8",
    "#f59e0b",
    "#f97316",
    "#ef4444",
  ];

  /* =======================================================
     LOADING STATE
  ======================================================= */

  if (loading) {
    return (
      <div className="page analytics-page">
        <div className="page-title">
          <div>
            <h1>Analytics</h1>
            <p>
              Understand delivery, workload and
              project progress.
            </p>
          </div>
        </div>

        <div className="analytics-loading-grid">
          <div className="analytics-skeleton-card" />
          <div className="analytics-skeleton-card" />
          <div className="analytics-skeleton-card analytics-skeleton-wide" />
        </div>
      </div>
    );
  }

  /* =======================================================
     ERROR STATE
  ======================================================= */

  if (error) {
    return (
      <div className="page analytics-page">
        <div className="page-title">
          <div>
            <h1>Analytics</h1>
            <p>
              Understand delivery, workload and
              project progress.
            </p>
          </div>
        </div>

        <section className="panel analytics-error-panel">
          <div className="analytics-error-icon">
            <BarChart3 size={26} />
          </div>

          <div>
            <h2>Unable to load analytics</h2>
            <p>{error}</p>

            <button
              type="button"
              className="btn btn-primary"
              onClick={loadAnalytics}
            >
              <RefreshCw size={16} />
              Try again
            </button>
          </div>
        </section>
      </div>
    );
  }

  /* =======================================================
     SUMMARY VALUES
  ======================================================= */

  const totalTasks = data?.totalTasks ?? 0;
  const completedTasks = data?.completedTasks ?? 0;
  const totalProjects = data?.totalProjects ?? 0;
  const totalMembers = data?.totalMembers ?? 0;
  const overallProgress = data?.overallProgress ?? 0;

  /* =======================================================
     MAIN PAGE
  ======================================================= */

  return (
    <div className="page analytics-page">
      {/* ===================================================
          PAGE HEADER
      =================================================== */}

      <div className="page-title analytics-page-header">
        <div>
          <div className="analytics-eyebrow">
            <BarChart3 size={16} />
            Performance overview
          </div>

          <h1>Analytics</h1>

          <p>
            Understand delivery, workload and
            project progress.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-secondary analytics-refresh-button"
          onClick={loadAnalytics}
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* ===================================================
          SUMMARY CARDS
      =================================================== */}

      <div className="analytics-summary-grid">
        <article className="analytics-summary-card">
          <div className="analytics-summary-icon">
            <ClipboardList size={20} />
          </div>

          <div>
            <span>Total tasks</span>
            <strong>{totalTasks}</strong>
          </div>
        </article>

        <article className="analytics-summary-card">
          <div className="analytics-summary-icon">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Completed tasks</span>
            <strong>{completedTasks}</strong>
          </div>
        </article>

        <article className="analytics-summary-card">
          <div className="analytics-summary-icon">
            <FolderKanban size={20} />
          </div>

          <div>
            <span>Total projects</span>
            <strong>{totalProjects}</strong>
          </div>
        </article>

        <article className="analytics-summary-card">
          <div className="analytics-summary-icon">
            <Users size={20} />
          </div>

          <div>
            <span>Team members</span>
            <strong>{totalMembers}</strong>
          </div>
        </article>
      </div>

      {/* ===================================================
          OVERALL PROGRESS
      =================================================== */}

      <section className="panel analytics-progress-panel">
        <div className="analytics-panel-header">
          <div>
            <h2>Overall progress</h2>
            <p>
              Current completion across TASKFLOW.
            </p>
          </div>

          <strong className="analytics-progress-value">
            {overallProgress}%
          </strong>
        </div>

        <div
          className="analytics-progress-track"
          aria-label={`Overall progress ${overallProgress}%`}
        >
          <div
            className="analytics-progress-fill"
            style={{
              width: `${Math.min(
                Math.max(overallProgress, 0),
                100
              )}%`,
            }}
          />
        </div>
      </section>

      {/* ===================================================
          CHART GRID
      =================================================== */}

      <div className="analytics-grid">
        {/* =================================================
            PRIORITY PIE CHART
        ================================================= */}

        <section className="panel analytics-chart-panel">
          <div className="analytics-panel-header">
            <div>
              <h2>Tasks by priority</h2>
              <p>
                Distribution of task priorities.
              </p>
            </div>
          </div>

          {priorityData.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <PieChart>
                <Pie
                  data={priorityData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  innerRadius={52}
                  paddingAngle={3}
                  label
                >
                  {priorityData.map(
                    (item, index) => (
                      <Cell
                        key={`priority-${item.name}-${index}`}
                        fill={
                          priorityColors[
                            index %
                              priorityColors.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />

                <Legend
                  verticalAlign="bottom"
                  height={36}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChartState
              message="No priority data available yet."
            />
          )}
        </section>

        {/* =================================================
            MEMBER BAR CHART
        ================================================= */}

        <section className="panel analytics-chart-panel">
          <div className="analytics-panel-header">
            <div>
              <h2>Tasks per member</h2>
              <p>
                Current workload across your team.
              </p>
            </div>
          </div>

          {memberData.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart
                data={memberData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -15,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  opacity={0.15}
                />

                <XAxis
                  dataKey="name"
                  tick={{
                    fontSize: 12,
                  }}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{
                    fontSize: 12,
                  }}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip />

                <Bar
                  dataKey="tasks"
                  name="Tasks"
                  fill="var(--accent)"
                  radius={[
                    8,
                    8,
                    0,
                    0,
                  ]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChartState
              message="No team workload data available yet."
            />
          )}
        </section>

        {/* =================================================
            STATUS LINE CHART
        ================================================= */}

        <section className="panel analytics-chart-panel full">
          <div className="analytics-panel-header">
            <div>
              <h2>Tasks by status</h2>
              <p>
                Current distribution of work across
                workflow stages.
              </p>
            </div>
          </div>

          {statusData.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <LineChart
                data={statusData}
                margin={{
                  top: 10,
                  right: 20,
                  left: -10,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  opacity={0.15}
                />

                <XAxis
                  dataKey="name"
                  tick={{
                    fontSize: 12,
                  }}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{
                    fontSize: 12,
                  }}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="value"
                  name="Tasks"
                  stroke="var(--accent)"
                  strokeWidth={3}
                  dot={{
                    r: 5,
                  }}
                  activeDot={{
                    r: 7,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChartState
              message="No status data available yet."
            />
          )}
        </section>

        {/* =================================================
            PROJECT PROGRESS
        ================================================= */}

        <section className="panel analytics-chart-panel full">
          <div className="analytics-panel-header">
            <div>
              <h2>Project progress</h2>
              <p>
                Progress across individual projects.
              </p>
            </div>
          </div>

          {projectProgressData.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <BarChart
                data={projectProgressData}
                layout="vertical"
                margin={{
                  top: 10,
                  right: 20,
                  left: 20,
                  bottom: 10,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  opacity={0.15}
                />

                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tickFormatter={(value) =>
                    `${value}%`
                  }
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  width={120}
                />

                <Tooltip
                  formatter={(value) => [
                    `${value}%`,
                    "Progress",
                  ]}
                />

                <Bar
                  dataKey="progress"
                  name="Progress"
                  fill="var(--accent)"
                  radius={[
                    0,
                    8,
                    8,
                    0,
                  ]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChartState
              message="No project progress data available yet."
            />
          )}
        </section>
      </div>
    </div>
  );
}

/* =========================================================
   EMPTY CHART STATE
========================================================= */

function EmptyChartState({ message }) {
  return (
    <div className="analytics-empty-chart">
      <BarChart3 size={32} />
      <p>{message}</p>
    </div>
  );
}