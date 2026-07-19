import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "https://motionguard-ai-production.up.railway.app/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      setMessage("✅ Registration Successful");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "❌ Registration Failed"
      );
    }
  };
return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#020617",
      color: "white",
    }}
  >
    <div
      style={{
        width: "400px",
        padding: "35px",
        background: "#0f172a",
        borderRadius: "20px",
        boxShadow: "0 0 40px rgba(0,255,255,0.15)",
        border: "1px solid #1e293b",
      }}
    >

      <h2
        style={{
          textAlign: "center",
          fontSize: "30px",
          marginBottom: "10px",
          color: "#22d3ee",
        }}
      >
        Create Account 🚀
      </h2>

      <p
        style={{
          textAlign: "center",
          color: "#94a3b8",
          marginBottom: "25px",
        }}
      >
        Join MotionGuard AI
      </p>


      {message && (
        <p
          style={{
            textAlign: "center",
            color: "#22c55e",
          }}
        >
          {message}
        </p>
      )}


     <input
  type="text"
  placeholder="Full Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  style={{
    width: "100%",
    height: "50px",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: name ? "white" : "#020617",
    color: name ? "black" : "white",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
  }}
/>


      <input
        type="email"
        placeholder="Email Address"
        
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          height: "50px",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "10px",
          border: "1px solid #334155",
         background: email ? "white" : "#020617",
color: email ? "black" : "white",
          fontSize: "16px",
          outline: "none",
          boxSizing: "border-box",
        }}
      />


      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          height: "50px",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "10px",
          border: "1px solid #334155",
         background: password ? "white" : "#020617",
color: password ? "black" : "white",
          fontSize: "16px",
          outline: "none",
          boxSizing: "border-box",
        }}
      />


      <button
        onClick={handleRegister}
        style={{
          width: "100%",
          height: "50px",
          background: "#06b6d4",
          color: "#020617",
          border: "none",
          borderRadius: "10px",
          fontSize: "18px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Register
      </button>


      <p
        style={{
          textAlign: "center",
          marginTop: "20px",
          color: "#94a3b8",
        }}
      >
        Already have an account?{" "}
        <Link
          to="/"
          style={{
            color: "#22d3ee",
            textDecoration: "none",
          }}
        >
          Login
        </Link>
      </p>

    </div>
  </div>
);
}
export default Register;