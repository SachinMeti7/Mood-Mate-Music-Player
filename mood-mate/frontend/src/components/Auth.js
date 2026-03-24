import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.placeholder.toLowerCase()]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async () => {
    try {
      const url = isLogin
        ? "http://localhost:5000/api/users/login"
        : "http://localhost:5000/api/users/register";

      const res = await axios.post(url, form);

      setUser(res.data);

      // redirect after login/register
      navigate("/home");
    } catch (err) {
      alert(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>{isLogin ? "🎵 Login" : "🎵 Create Account"}</h2>

        <input
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>
          {isLogin ? "Login" : "Register"}
        </button>

        {/* TOGGLE */}
        <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer" }}>
          {isLogin
            ? "Don't have an account? Create one"
            : "Already have an account? Login"}
        </p>

      </div>
    </div>
  );
}