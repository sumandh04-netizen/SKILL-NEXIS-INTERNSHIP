import { useState } from "react";
import {
  Sun,
  Moon,
  ShieldCheck,
  User,
  Palette,
  CheckCircle2,
} from "lucide-react";
import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const { user } = useAuth();
  const { theme, toggle } = useTheme();

  const [changingTheme, setChangingTheme] =
    useState(false);

  const handleThemeToggle = () => {
    try {
      setChangingTheme(true);

      toggle();

      toast.success(
        theme === "light"
          ? "Dark mode enabled."
          : "Light mode enabled."
      );
    } catch (error) {
      console.error(
        "Failed to change theme:",
        error
      );

      toast.error("Could not change the theme.");
    } finally {
      setTimeout(() => {
        setChangingTheme(false);
      }, 300);
    }
  };

  const isLightTheme = theme === "light";

  return (
    <div className="page settings-page">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="page-title settings-page-header">
        <div>
          <div className="settings-eyebrow">
            <Palette size={15} />
            WORKSPACE PREFERENCES
          </div>

          <h1>Settings</h1>

          <p>
            Manage your TASKFLOW workspace preferences.
          </p>
        </div>
      </div>

      {/* =====================================================
          APPEARANCE
      ====================================================== */}

      <section className="settings-card">
        <div className="settings-card-content">
          <div className="settings-card-icon">
            {isLightTheme ? (
              <Sun size={21} />
            ) : (
              <Moon size={21} />
            )}
          </div>

          <div>
            <h2>Appearance</h2>

            <p>
              Switch between a bright and focused dark
              workspace.
            </p>

            <div className="settings-current-theme">
              <CheckCircle2 size={14} />

              <span>
                Current theme:{" "}
                <strong>
                  {isLightTheme
                    ? "Light"
                    : "Dark"}
                </strong>
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="secondary settings-theme-button"
          onClick={handleThemeToggle}
          disabled={changingTheme}
        >
          {isLightTheme ? (
            <Moon size={18} />
          ) : (
            <Sun size={18} />
          )}

          {isLightTheme
            ? "Dark mode"
            : "Light mode"}
        </button>
      </section>

      {/* =====================================================
          PROFILE
      ====================================================== */}

      <section className="settings-card">
        <div className="settings-card-content">
          <div className="settings-card-icon">
            <User size={21} />
          </div>

          <div className="settings-profile-content">
            <h2>Profile</h2>

            <p className="settings-user-name">
              {user?.name || "TASKFLOW User"}
            </p>

            <small>
              {user?.email ||
                "No email address available"}
            </small>
          </div>
        </div>

        <div className="settings-security">
          <ShieldCheck size={27} />

          <div>
            <strong>Account protected</strong>
            <span>
              Your account uses secure authentication.
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          WORKSPACE INFORMATION
      ====================================================== */}

      <section className="settings-card settings-info-card">
        <div className="settings-card-content">
          <div className="settings-card-icon">
            <Palette size={21} />
          </div>

          <div>
            <h2>TASKFLOW Workspace</h2>

            <p>
              Your workspace preferences are saved
              automatically on this device.
            </p>
          </div>
        </div>

        <div className="settings-status">
          <span className="settings-status-dot" />
          Preferences active
        </div>
      </section>
    </div>
  );
}