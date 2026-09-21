import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post("/login", {
        email,
        password
      });

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/dashboard");

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (

    <div className="auth-container">

      <div className="auth-box">

        <h1>Todo Application</h1>

        <h2>Login</h2>

        {message && (
          <p className="error">
            {message}
          </p>
        )}

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p>
          Don't have an account?
          {" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;