import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FolderKanban,
  ClipboardList,
  CheckCircle2,
  Users,
  TrendingUp,
  RefreshCw,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";

import api from "../services/api";
import MetricCard from "../components/MetricCard";

/* =========================================================
   DASHBOARD
========================================================= */

export default function Dashboard() {
  const [data, setData] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =======================================================
     LOAD DASHBOARD DATA
  ======================================================= */

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const response =
        await api.get("/analytics");

      setData(response.data);
    } catch (requestError) {
      console.error(
        "Failed to load dashboard:",
        requestError
      );

      setError(
        requestError.response?.data?.message ||
          "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  /* =======================================================
     STATUS CHART DATA
  ======================================================= */

  const statusChart = useMemo(() => {
    if (!Array.isArray(data?.byStatus)) {
      return [];
    }

    return data.byStatus;
  }, [data]);

  /* =======================================================
     MEMBER CHART DATA
  ======================================================= */

  const memberChart = useMemo(() => {
    if (!Array.isArray(data?.membersData)) {
      return [];
    }

    return data.membersData;
  }, [data]);

  /* =======================================================
     LOADING STATE
  ======================================================= */

  if (loading) {
    return (
      <div className="page dashboard-page">
        <div className="page-title">
          <div>
            <h1>Dashboard</h1>

            <p>
              Loading your workspace...
            </p>
          </div>
        </div>

        <div className="skeleton-grid">
          {[
            1,
            2,
            3,
            4,
          ].map((item) => (
            <div
              className="skeleton"
              key={item}
            />
          ))}
        </div>

        <div className="dashboard-loading-grid">
          <div className="skeleton dashboard-chart-skeleton" />

          <div className="skeleton dashboard-progress-skeleton" />
        </div>
      </div>
    );
  }

  /* =======================================================
     ERROR STATE
  ======================================================= */

  if (error) {
    return (
      <div className="page dashboard-page">
        <div className="page-title">
          <div>
            <h1>Dashboard</h1>

            <p>
              Here’s what’s happening
              across your workspace.
            </p>
          </div>
        </div>

        <section className="panel dashboard-error">
          <div className="dashboard-error-icon">
            <AlertCircle size={25} />
          </div>

          <div>
            <h2>
              Dashboard unavailable
            </h2>

            <p>{error}</p>

            <button
              type="button"
              className="primary"
              onClick={loadDashboard}
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
     SAFE VALUES
  ======================================================= */

  const totalProjects =
    data?.totalProjects ?? 0;

  const totalTasks =
    data?.totalTasks ?? 0;

  const completedTasks =
    data?.completedTasks ?? 0;

  const totalMembers =
    data?.totalMembers ?? 0;

  const overallProgress =
    Number(data?.overallProgress ?? 0);

  /* =======================================================
     MAIN DASHBOARD
  ======================================================= */

  return (
    <div className="page dashboard-page">
      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="page-title dashboard-header">
        <div>
          <div className="dashboard-eyebrow">
            <TrendingUp size={15} />
            WORKSPACE OVERVIEW
          </div>

          <h1>
            Good to see you.
          </h1>

          <p>
            Here’s what’s happening
            across your workspace.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={loadDashboard}
            disabled={loading}
          >
            <RefreshCw
              size={16}
              className={
                loading
                  ? "dashboard-spin"
                  : ""
              }
            />

            Refresh
          </button>

          <button
            type="button"
            className="primary"
            onClick={() => {
              window.location.href =
                "/tasks";
            }}
          >
            View tasks
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      {/* =================================================
          METRICS
      ================================================= */}

      <div className="metric-grid">
        <MetricCard
          icon={FolderKanban}
          label="Projects"
          value={totalProjects}
          detail="Active projects"
        />

        <MetricCard
          icon={ClipboardList}
          label="Tasks"
          value={totalTasks}
          detail="Across all projects"
        />

        <MetricCard
          icon={CheckCircle2}
          label="Completed"
          value={completedTasks}
          detail="Tasks finished"
        />

        <MetricCard
          icon={Users}
          label="Team members"
          value={totalMembers}
          detail="Workspace users"
        />
      </div>

      {/* =================================================
          MAIN DASHBOARD GRID
      ================================================= */}

      <div className="dashboard-grid">
        {/* ===============================================
            TASK FLOW
        =============================================== */}

        <section className="panel chart-panel">
          <div className="panel-head">
            <div>
              <h2>
                Task flow
              </h2>

              <p>
                Current status distribution
              </p>
            </div>

            <div className="dashboard-panel-icon">
              <TrendingUp size={19} />
            </div>
          </div>

          {statusChart.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height={280}
            >
              <AreaChart
                data={statusChart}
                margin={{
                  top: 10,
                  right: 10,
                  left: -15,
                  bottom: 5,
                }}
              >
                <defs>
                  <linearGradient
                    id="taskFlowGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--accent)"
                      stopOpacity={0.3}
                    />

                    <stop
                      offset="100%"
                      stopColor="var(--accent)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  opacity={0.12}
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

                <Area
                  type="monotone"
                  dataKey="value"
                  name="Tasks"
                  fill="url(#taskFlowGradient)"
                  stroke="var(--accent)"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "var(--accent)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <EmptyDashboardState
              message="No task status data available yet."
            />
          )}
        </section>

        {/* ===============================================
            OVERALL PROGRESS
        =============================================== */}

        <section className="panel progress-panel">
          <div className="panel-head">
            <div>
              <h2>
                Overall progress
              </h2>

              <p>
                Average task completion
              </p>
            </div>
          </div>

          <div
            className="progress-ring"
            style={{
              "--progress": `${Math.min(
                Math.max(
                  overallProgress,
                  0
                ),
                100
              )}%`,
            }}
            aria-label={`Overall progress ${overallProgress}%`}
          >
            <div>
              {overallProgress}%
            </div>
          </div>

          <div className="dashboard-progress-info">
            <strong>
              {completedTasks}
            </strong>

            <span>
              of {totalTasks} tasks completed
            </span>
          </div>

          <p className="center">
            Keep your team moving
            forward.
          </p>
        </section>
      </div>

      {/* =================================================
          TASKS BY MEMBER
      ================================================= */}

      <section className="panel dashboard-member-panel">
        <div className="panel-head">
          <div>
            <h2>
              Tasks by member
            </h2>

            <p>
              Assignment distribution
            </p>
          </div>

          <Users size={20} />
        </div>

        {memberChart.length > 0 ? (
          <ResponsiveContainer
            width="100%"
            height={280}
          >
            <BarChart
              data={memberChart}
              margin={{
                top: 10,
                right: 10,
                left: -15,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                opacity={0.12}
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
          <EmptyDashboardState
            message="No member assignment data available yet."
          />
        )}
      </section>

      {/* =================================================
          QUICK SUMMARY
      ================================================= */}

      <section className="dashboard-summary-grid">
        <div className="dashboard-summary-card">
          <div className="dashboard-summary-icon">
            <FolderKanban size={19} />
          </div>

          <div>
            <span>
              Projects
            </span>

            <strong>
              {totalProjects}
            </strong>
          </div>
        </div>

        <div className="dashboard-summary-card">
          <div className="dashboard-summary-icon">
            <ClipboardList size={19} />
          </div>

          <div>
            <span>
              Open tasks
            </span>

            <strong>
              {Math.max(
                totalTasks -
                  completedTasks,
                0
              )}
            </strong>
          </div>
        </div>

        <div className="dashboard-summary-card">
          <div className="dashboard-summary-icon">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <span>
              Completion
            </span>

            <strong>
              {overallProgress}%
            </strong>
          </div>
        </div>

        <div className="dashboard-summary-card">
          <div className="dashboard-summary-icon">
            <Users size={19} />
          </div>

          <div>
            <span>
              Team size
            </span>

            <strong>
              {totalMembers}
            </strong>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   EMPTY DASHBOARD STATE
========================================================= */

function EmptyDashboardState({
  message,
}) {
  return (
    <div className="dashboard-empty-chart">
      <TrendingUp size={30} />

      <p>{message}</p>
    </div>
  );
}