import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function PrivateRoute({ element }) {
  const { user } = useContext(AuthContext);
  return user ? element : <Navigate to="/login" />;
}

export default PrivateRoute;
