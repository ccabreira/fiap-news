import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#222", color: "white", display: "flex", justifyContent: "space-between" }}>
      <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: "20px" }}>Home</Link>
      <div>
        {token ? (
          <button onClick={handleLogout} style={{ background: "red", border: "none", color: "white", cursor: "pointer" }}>Logout</button>
        ) : (
          <Link to="/login" style={{ color: "white", textDecoration: "none", marginLeft: "10px" }}>Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
