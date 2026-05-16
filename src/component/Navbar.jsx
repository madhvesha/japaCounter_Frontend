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
        <nav className="bg-black/20 backdrop-blur-xl border-b border-white/10 px-4 md:px-6 py-4 text-white shadow-lg sticky top-0 z-50">

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                {/* Top Section */}

                <div className="flex items-center justify-between">

                    {/* Logo */}

                    <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                            🧘
                        </div>

                        <div>

                            <h1 className="font-bold text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Japa Counter
                            </h1>

                            {name && (
                                <span className="text-sm text-slate-300">
                                    Welcome, {name} 🙏
                                </span>
                            )}

                        </div>

                    </div>

                </div>

                {/* Navigation */}

                <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">

                    <Link
                        to="/dashboard"
                        className="px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 text-slate-200 hover:text-white no-underline"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/history"
                        className="px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 text-slate-200 hover:text-white no-underline"
                    >
                        History
                    </Link>

                    <Link
                        to="/leaderboard"
                        className="px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 text-slate-200 hover:text-white no-underline"
                    >
                        Leaderboard
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 transition-all duration-300 px-5 py-2 rounded-xl font-semibold shadow-lg"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
}

