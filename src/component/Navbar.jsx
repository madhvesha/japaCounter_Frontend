import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar() {
    const { name, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    // console.log("AuthContext:", useContext(AuthContext));
    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully");
        navigate("/login");
    };

    return (
        <nav className="bg-orange-500 text-white px-6 py-3 flex justify-between items-center">
            <h1 className="font-bold text-lg">🧘 Japa Counter</h1>
            {/* 👋 Welcome message */}
            {name && (
                <span className="font-semibold">
                    Welcome, {name} 🙏
                </span>
            )}

            <div className="flex gap-4 items-center">
                <Link to="/dashboard" className="no-underline hover:underline">
                    Dashboard
                </Link>
                <Link to="/history" className="no-underline hover:underline">
                    History
                </Link>

                <Link to="/leaderboard" className="no-underline hover:underline">
                    Leaderboard
                </Link>

                <button
                    onClick={handleLogout}
                    className="bg-white text-orange-500 px-3 py-1 rounded font-semibold"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
