import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";

import "./Auth.css";

export default function Auth({ mode = "login" }) {
  const isLogin = mode === "login";

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!isLogin && !name) {
      toast.error("Please enter your name.");
      return;
    }

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    if (password.length < 6) {
      toast.error(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (!isLogin && password !== form.confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await login({
          email,
          password,
        });
      } else {
        await register({
          name,
          email,
          password,
        });
      }

      toast.success(
        isLogin
          ? "Welcome back!"
          : "Account created successfully!"
      );

      navigate("/");
    } catch (error) {
      console.error("Authentication error:", error);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      {/* =====================================================
          LEFT BRANDING SECTION
      ===================================================== */}

      <section className="auth-art">
        <div className="auth-art-overlay" />

        <div className="auth-art-content">
          {/* BRAND */}
          <div className="auth-brand">
            <div className="auth-brand-mark">
              T
            </div>

            <div>
              <strong>TASKFLOW</strong>
              <span>PROJECT MANAGEMENT</span>
            </div>
          </div>

          {/* HERO */}
          <div className="auth-hero">
            <div className="auth-eyebrow">
              <Sparkles size={15} />
              WORKSPACE FOR MODERN TEAMS
            </div>

            <h1>
              Work clearly.
              <br />
              <span>Ship confidently.</span>
            </h1>

            <p>
              Plan projects, align teams and move
              every task forward from one beautiful
              workspace.
            </p>
          </div>

          {/* FEATURES */}
          <div className="auth-points">
            <div className="auth-point">
              <div className="auth-point-icon">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <strong>Premium project boards</strong>
                <span>
                  Organize every project visually.
                </span>
              </div>
            </div>

            <div className="auth-point">
              <div className="auth-point-icon">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <strong>
                  Real-time progress visibility
                </strong>

                <span>
                  Know exactly what is happening.
                </span>
              </div>
            </div>

            <div className="auth-point">
              <div className="auth-point-icon">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <strong>
                  Team-focused analytics
                </strong>

                <span>
                  Understand workload and delivery.
                </span>
              </div>
            </div>

            <div className="auth-point">
              <div className="auth-point-icon">
                <ShieldCheck size={18} />
              </div>

              <div>
                <strong>
                  Secure team collaboration
                </strong>

                <span>
                  Keep your workspace protected.
                </span>
              </div>
            </div>
          </div>

          <div className="auth-art-footer">
            <span>
              TASKFLOW
            </span>

            <span>
              Plan • Build • Deliver
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          AUTH FORM SECTION
      ===================================================== */}

      <section className="auth-form-area">
        <div className="auth-card">
          {/* LOGO */}
          <div className="auth-logo">
            T
          </div>

          {/* TITLE */}
          <div className="auth-card-heading">
            <h2>
              {isLogin
                ? "Welcome back"
                : "Create your account"}
            </h2>

            <p>
              {isLogin
                ? "Sign in to continue to TASKFLOW."
                : "Start managing your projects today."}
            </p>
          </div>

          {/* FORM */}
          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            {/* NAME */}
            {!isLogin && (
              <label className="auth-field">
                <span>Name</span>

                <input
                  required
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Your name"
                  autoComplete="name"
                  disabled={loading}
                />
              </label>
            )}

            {/* EMAIL */}
            <label className="auth-field">
              <span>Email address</span>

              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={loading}
              />
            </label>

            {/* PASSWORD */}
            <label className="auth-field">
              <span>Password</span>

              <div className="auth-password">
                <input
                  required
                  minLength={6}
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={form.password}
                  onChange={updateField}
                  placeholder="At least 6 characters"
                  autoComplete={
                    isLogin
                      ? "current-password"
                      : "new-password"
                  }
                  disabled={loading}
                />

                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (current) => !current
                    )
                  }
                  disabled={loading}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <small>
                Minimum 6 characters
              </small>
            </label>

            {/* CONFIRM PASSWORD */}
            {!isLogin && (
              <label className="auth-field">
                <span>
                  Confirm password
                </span>

                <div className="auth-password">
                  <input
                    required
                    minLength={6}
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirm"
                    value={form.confirm}
                    onChange={updateField}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    disabled={loading}
                  />

                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) => !current
                      )
                    }
                    disabled={loading}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </label>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="auth-spinner" />
                  Please wait...
                </>
              ) : (
                <>
                  {isLogin
                    ? "Sign in"
                    : "Create account"}

                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* SWITCH LOGIN / REGISTER */}
          <div className="auth-switch">
            <span>
              {isLogin
                ? "New to TASKFLOW?"
                : "Already have an account?"}
            </span>

            <Link
              to={
                isLogin
                  ? "/register"
                  : "/login"
              }
            >
              {isLogin
                ? "Create an account"
                : "Sign in"}
            </Link>
          </div>

          {/* SECURITY */}
          <div className="auth-security">
            <ShieldCheck size={15} />

            <span>
              Your workspace is protected with
              secure authentication.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}