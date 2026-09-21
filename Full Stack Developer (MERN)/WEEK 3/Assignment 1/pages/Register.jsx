import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await API.post("/register", {
        name,
        email,
        password
      });

      alert("Registration successful");

      navigate("/login");

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (

    <div className="auth-container">

      <div className="auth-box">

        <h1>Todo Application</h1>

        <h2>Register</h2>

        {message && (
          <p className="error">
            {message}
          </p>
        )}

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

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
            Register
          </button>

        </form>

        <p>
          Already have an account?
          {" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;