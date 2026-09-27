import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  FolderKanban,
  ClipboardList,
  Sparkles,
  Users,
  BarChart3,
  Settings,
  Sun,
  Moon,
  LogOut,
  Menu,
  Search,
  Bell,
  X,
  ChevronRight,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

import { useState } from "react";


// =========================================================
// NAVIGATION ITEMS
// =========================================================

const navigationItems = [
  {
    to: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/projects",
    label: "Projects",
    icon: FolderKanban,
  },
  {
    to: "/boards",
    label: "Boards",
    icon: ClipboardList,
  },
  {
    to: "/tasks",
    label: "Tasks",
    icon: ClipboardList,
  },
  {
    to: "/ai-assistant",
    label: "AI Assistant",
    icon: Sparkles,
  },
  {
    to: "/team",
    label: "Team",
    icon: Users,
  },
  {
    to: "/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  {
    to: "/settings",
    label: "Settings",
    icon: Settings,
  },
];


// =========================================================
// PAGE NAME
// =========================================================

function getPageName(pathname) {
  if (pathname === "/") {
    return "Dashboard";
  }

  const pathSegments = pathname
    .split("/")
    .filter(Boolean);

  if (pathSegments.length === 0) {
    return "Dashboard";
  }

  const pageName = pathSegments[0];

  return pageName
    .replace(/-/g, " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
}


// =========================================================
// USER INITIALS
// =========================================================

function getInitials(name = "") {
  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return "U";
  }

  if (words.length === 1) {
    return words[0]
      .charAt(0)
      .toUpperCase();
  }

  return (
    words[0].charAt(0) +
    words[words.length - 1].charAt(0)
  ).toUpperCase();
}


// =========================================================
// LAYOUT
// =========================================================

export default function Layout() {
  const {
    user,
    logout,
  } = useAuth();

  const {
    theme,
    toggle,
  } = useTheme();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [searchValue, setSearchValue] =
    useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const pageName = getPageName(
    location.pathname
  );

  const userInitials = getInitials(
    user?.name
  );


  // =======================================================
  // SIDEBAR FUNCTIONS
  // =======================================================

  function closeSidebar() {
    setSidebarOpen(false);
  }

  function openSidebar() {
    setSidebarOpen(true);
  }


  // =======================================================
  // LOGOUT
  // =======================================================

  function handleLogout() {
    logout();

    closeSidebar();

    navigate("/login");
  }


  // =======================================================
  // SEARCH
  // =======================================================

  function handleSearchSubmit(event) {
    event.preventDefault();

    const query = searchValue.trim();

    if (!query) {
      return;
    }

    navigate(
      `/tasks?search=${encodeURIComponent(query)}`
    );

    closeSidebar();
  }


  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div className="app-shell">

      {/* ===================================================
          MOBILE SIDEBAR OVERLAY
      ==================================================== */}

      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={closeSidebar}
        />
      )}


      {/* ===================================================
          SIDEBAR
      ==================================================== */}

      <aside
        className={`sidebar ${
          sidebarOpen ? "open" : ""
        }`}
        aria-label="Main navigation"
      >

        {/* =================================================
            BRAND
        ================================================== */}

        <div className="brand">

          <button
            type="button"
            className="brand-link"
            onClick={() => {
              navigate("/");
              closeSidebar();
            }}
            aria-label="Go to TASKFLOW dashboard"
          >
            <span className="brand-mark">
              T
            </span>

            <strong>
              TASKFLOW
            </strong>
          </button>


          {/* Mobile Close Button */}

          <button
            type="button"
            className="mobile-close"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <X size={21} />
          </button>

        </div>


        {/* =================================================
            NAVIGATION
        ================================================== */}

        <nav className="sidebar-nav">

          <div className="nav-section-title">
            WORKSPACE
          </div>


          {navigationItems.map(
            ({
              to,
              label,
              icon: Icon,
              end,
            }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `sidebar-link ${
                    isActive
                      ? "active"
                      : ""
                  }`
                }
              >

                <Icon
                  size={19}
                  strokeWidth={2}
                />


                <span>
                  {label}
                </span>


                {location.pathname ===
                  to && (
                  <ChevronRight
                    size={16}
                    className="nav-active-arrow"
                  />
                )}

              </NavLink>
            )
          )}

        </nav>


        {/* =================================================
            SIDEBAR BOTTOM
        ================================================== */}

        <div className="sidebar-bottom">

          {/* =================================================
              THEME BUTTON
          ================================================== */}

          <button
            type="button"
            className="sidebar-action"
            onClick={toggle}
            aria-label={
              theme === "light"
                ? "Switch to dark mode"
                : "Switch to light mode"
            }
          >

            {theme === "light" ? (
              <Moon size={19} />
            ) : (
              <Sun size={19} />
            )}

            <span>
              {theme === "light"
                ? "Dark mode"
                : "Light mode"}
            </span>

          </button>


          {/* =================================================
              USER PROFILE
          ================================================== */}

          <button
            type="button"
            className="profile-card"
            onClick={() =>
              navigate("/settings")
            }
            aria-label="Open account settings"
          >

            <div className="avatar">

              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={`${user?.name || "User"} avatar`}
                />
              ) : (
                userInitials
              )}

            </div>


            <div className="profile-info">

              <strong>
                {user?.name || "User"}
              </strong>

              <small>
                {user?.email ||
                  "No email available"}
              </small>

            </div>

          </button>


          {/* =================================================
              LOGOUT
          ================================================== */}

          <button
            type="button"
            className="sidebar-action logout-action"
            onClick={handleLogout}
          >

            <LogOut size={19} />

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>


      {/* ===================================================
          MAIN AREA
      ==================================================== */}

      <div className="main-area">


        {/* =================================================
            TOP HEADER
        ================================================== */}

        <header className="topbar">

          <div className="topbar-left">


            {/* =============================================
                MOBILE MENU
            ============================================== */}

            <button
              type="button"
              className="mobile-menu"
              onClick={openSidebar}
              aria-label="Open navigation"
            >
              <Menu size={22} />
            </button>


            {/* =============================================
                BREADCRUMB
            ============================================== */}

            <div
              className="breadcrumb"
              aria-label="Breadcrumb"
            >

              <button
                type="button"
                className="breadcrumb-home"
                onClick={() =>
                  navigate("/")
                }
              >
                TASKFLOW
              </button>


              <ChevronRight
                size={15}
              />


              <span>
                {pageName}
              </span>

            </div>

          </div>


          {/* =================================================
              HEADER ACTIONS
          ================================================== */}

          <div className="header-actions">


            {/* =============================================
                SEARCH
            ============================================== */}

            <form
              className="search-mini"
              onSubmit={
                handleSearchSubmit
              }
            >

              <Search
                size={17}
                aria-hidden="true"
              />


              <input
                type="search"
                value={searchValue}
                onChange={(event) =>
                  setSearchValue(
                    event.target.value
                  )
                }
                placeholder="Search tasks..."
                aria-label="Search tasks"
              />

            </form>


            {/* =============================================
                THEME BUTTON
            ============================================== */}

            <button
              type="button"
              className="header-icon-button desktop-theme-button"
              onClick={toggle}
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
            >

              {theme === "light" ? (
                <Moon size={19} />
              ) : (
                <Sun size={19} />
              )}

            </button>


            {/* =============================================
                NOTIFICATIONS
            ============================================== */}

            <button
              type="button"
              className="header-icon-button notification-button"
              aria-label="Notifications"
            >

              <Bell size={19} />

              <span className="notification-dot" />

            </button>


            {/* =============================================
                USER AVATAR
            ============================================== */}

            <button
              type="button"
              className="header-avatar-button"
              onClick={() =>
                navigate("/settings")
              }
              aria-label="Open profile settings"
            >

              <div className="avatar header-avatar">

                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user?.name || "User"} avatar`}
                  />
                ) : (
                  userInitials
                )}

              </div>

            </button>

          </div>

        </header>


        {/* =================================================
            PAGE CONTENT
        ================================================== */}

        <main className="page-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}