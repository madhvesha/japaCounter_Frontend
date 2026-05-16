// import { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import toast from "react-hot-toast";

// export default function Navbar() {
//     const { name, logout } = useContext(AuthContext);
//     const navigate = useNavigate();
//     // console.log("AuthContext:", useContext(AuthContext));
//     const handleLogout = () => {
//         logout();
//         toast.success("Logged out successfully");
//         navigate("/login");
//     };

//     return (
//         <nav className="bg-orange-500 text-white px-6 py-3 flex justify-between items-center">
//             <h1 className="font-bold text-lg">🧘 Japa Counter</h1>
//             {/* 👋 Welcome message */}
//             {name && (
//                 <span className="font-semibold">
//                     Welcome, {name} 🙏
//                 </span>
//             )}

//             <div className="flex gap-4 items-center">
//                 <Link to="/dashboard" className="no-underline hover:underline">
//                     Dashboard
//                 </Link>
//                 <Link to="/history" className="no-underline hover:underline">
//                     History
//                 </Link>

//                 <Link to="/leaderboard" className="no-underline hover:underline">
//                     Leaderboard
//                 </Link>

//                 <button
//                     onClick={handleLogout}
//                     className="bg-white text-orange-500 px-3 py-1 rounded font-semibold"
//                 >
//                     Logout
//                 </button>
//             </div>
//         </nav>
//     );
// }

import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();

    const navLinks = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "History", path: "/history" },
        { name: "Leaderboard", path: "/leaderboard" },
    ];

    return (
        <nav className="w-full bg-black/20 backdrop-blur-xl border-b border-white/10 px-6 py-4 shadow-lg sticky top-0 z-50">

            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Logo */}

                <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                        ॐ
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            JapaCounter
                        </h1>

                        <p className="text-xs text-slate-300">
                            Spiritual Progress Tracker
                        </p>
                    </div>

                </div>

                {/* Navigation Links */}

                <div className="hidden md:flex items-center gap-4">

                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;

                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`px-5 py-2 rounded-xl font-medium transition-all duration-300 ${isActive
                                        ? "bg-purple-600 text-white shadow-lg"
                                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}

                </div>

                {/* Mobile Menu Button */}

                <button className="md:hidden text-white text-2xl">
                    ☰
                </button>

            </div>

        </nav>
    );
}