import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewsList from "./pages/NewsList";
import NewsDetail from "./pages/NewsDetail";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Importe o novo componente
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Nova rota */}
      </Routes>
    </Router>
  );
}

export default App;



