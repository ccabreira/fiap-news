import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "./pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NewsDetail from "../pages/NewsDetail";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/admin" element={<PrivateRoute />} />
      </Routes>
    </>
  );
}

export default App;
