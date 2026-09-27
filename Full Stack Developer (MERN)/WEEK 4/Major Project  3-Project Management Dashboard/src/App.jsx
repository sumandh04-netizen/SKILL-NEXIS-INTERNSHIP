import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "./context/AuthContext";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Board from "./pages/Board";
import Analytics from "./pages/Analytics";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import AIAssistant from "./pages/AIAssistant";


// =========================================================
// PRIVATE ROUTE
// =========================================================

function PrivateRoute() {
  const {
    token,
    loading,
  } = useAuth();


  // -------------------------------------------------------
  // AUTHENTICATION LOADING
  // -------------------------------------------------------

  if (loading) {
    return (
      <div className="app-loading">

        <div className="app-loading-spinner" />

        <p>
          Loading TASKFLOW...
        </p>

      </div>
    );
  }


  // -------------------------------------------------------
  // AUTHENTICATED APPLICATION
  // -------------------------------------------------------

  return token ? (
    <Layout />
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
}


// =========================================================
// APP
// =========================================================

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =================================================
            PUBLIC AUTH ROUTES
        ================================================== */}

        <Route
          path="/login"
          element={
            <Auth mode="login" />
          }
        />

        <Route
          path="/register"
          element={
            <Auth mode="register" />
          }
        />


        {/* =================================================
            PROTECTED APPLICATION ROUTES
        ================================================== */}

        <Route element={<PrivateRoute />}>

          {/* ===============================================
              DASHBOARD
          ================================================ */}

          <Route
            path="/"
            element={
              <Dashboard />
            }
          />


          {/* ===============================================
              PROJECTS
          ================================================ */}

          <Route
            path="/projects"
            element={
              <Projects />
            }
          />


          {/* ===============================================
              BOARDS
          ================================================ */}

          <Route
            path="/boards"
            element={
              <Board />
            }
          />


          {/* ===============================================
              TASKS
          ================================================ */}

          <Route
            path="/tasks"
            element={
              <Tasks />
            }
          />


          {/* ===============================================
              AI ASSISTANT
          ================================================ */}

          <Route
            path="/ai-assistant"
            element={
              <AIAssistant />
            }
          />


          {/* ===============================================
              TEAM
          ================================================ */}

          <Route
            path="/team"
            element={
              <Team />
            }
          />


          {/* ===============================================
              ANALYTICS
          ================================================ */}

          <Route
            path="/analytics"
            element={
              <Analytics />
            }
          />


          {/* ===============================================
              SETTINGS
          ================================================ */}

          <Route
            path="/settings"
            element={
              <Settings />
            }
          />

        </Route>


        {/* =================================================
            FALLBACK ROUTE
        ================================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>


      {/* ===================================================
          GLOBAL TOAST NOTIFICATIONS
      ==================================================== */}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

    </BrowserRouter>
  );
}