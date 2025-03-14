import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h2 className="text-3xl font-bold">Welcome to the Dashboard</h2>
            <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300"
            >
                Logout
            </button>
        </div>
    );
}

export default Dashboard