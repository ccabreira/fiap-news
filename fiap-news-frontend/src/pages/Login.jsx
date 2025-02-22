import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = "http://localhost:5000/auth/login";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      setError(data.message || "Erro ao fazer login");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "300px", margin: "0 auto" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <button type="submit" style={{ width: "100%", padding: "10px", background: "#555", border: "none", color: "white", cursor: "pointer" }}>
          Entrar
        </button>
      </form>
      <p style={{ marginTop: "10px", textAlign: "center" }}>
        Não tem uma conta? <Link to="/register">Cadastre-se</Link>
      </p>
    </div>
  );
}

export default Login;

