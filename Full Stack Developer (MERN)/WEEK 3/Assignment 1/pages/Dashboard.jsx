import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

function Dashboard() {

  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // =================================================
  // GET TODOS
  // =================================================

  const fetchTodos = async () => {

    try {

      const response = await API.get("/todos");

      setTodos(response.data);

    } catch (error) {

      if (error.response?.status === 401) {

        localStorage.clear();

        navigate("/login");
      }
    }
  };

  useEffect(() => {

    fetchTodos();

  }, []);


  // =================================================
  // ADD TODO
  // =================================================

  const addTodo = async (todo) => {

    try {

      await API.post("/todos", todo);

      fetchTodos();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to add todo"
      );
    }
  };


  // =================================================
  // DELETE TODO
  // =================================================

  const deleteTodo = async (id) => {

    if (!window.confirm(
      "Are you sure you want to delete this todo?"
    )) {
      return;
    }

    try {

      await API.delete(`/todos/${id}`);

      fetchTodos();

    } catch (error) {

      alert("Failed to delete todo");
    }
  };


  // =================================================
  // TOGGLE TODO
  // =================================================

  const toggleTodo = async (todo) => {

    try {

      await API.put(
        `/todos/${todo.id}`,
        {
          completed: !todo.completed
        }
      );

      fetchTodos();

    } catch (error) {

      alert("Failed to update todo");
    }
  };


  // =================================================
  // EDIT TODO
  // =================================================

  const editTodo = async (todo) => {

    const newTitle = window.prompt(
      "Enter new title:",
      todo.title
    );

    if (newTitle === null) {
      return;
    }

    const newDescription = window.prompt(
      "Enter new description:",
      todo.description
    );

    if (newDescription === null) {
      return;
    }

    try {

      await API.put(
        `/todos/${todo.id}`,
        {
          title: newTitle,
          description: newDescription
        }
      );

      fetchTodos();

    } catch (error) {

      alert("Failed to edit todo");
    }
  };


  // =================================================
  // LOGOUT
  // =================================================

  const logout = () => {

    localStorage.clear();

    navigate("/login");
  };


  // =================================================
  // UI
  // =================================================

  return (

    <div className="dashboard">

      <nav className="navbar">

        <h2>
          Todo App
        </h2>

        <div>

          <span>
            Welcome, {user?.name}
          </span>

          <button
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </nav>


      <main className="container">

        <h1>
          My Todo List
        </h1>

        <TodoForm
          onAdd={addTodo}
        />

        <TodoList
          todos={todos}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
          onEdit={editTodo}
        />

      </main>

    </div>
  );
}

export default Dashboard;