import {Navigate, useNavigate} from "react-router-dom";

export default function PrivateRoute ({ element }) {

    const isAuthenticated = !!localStorage.getItem("user_phone");
    return isAuthenticated ? element : <Navigate to="/login" />;
}

