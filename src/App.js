import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

<<<<<<< HEAD
// Componente "App" com "A" maiúsculo
=======
// O componente é definido com o nome "App" (inicial maiúscula)
>>>>>>> c57e7560 (Forçando a inclusão de arquivos para commit)
function App() {
  return (
    <Router basename="/">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

<<<<<<< HEAD
// Export do componente "App"
export default App;
=======
// Exportação do componente "App"
export default App;
>>>>>>> c57e7560 (Forçando a inclusão de arquivos para commit)
