import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!name || !email || !password) {
            toast.error("All fields are required");
            return;
        }


        axios.post("https://japacounter.onrender.com/api/auth/register", {
            name,
            email,
            password
        })

            // After successful registration → go to login
            .then(() => {
                toast.success("Registration successful! Please login");
                navigate("/login");
            })

            .catch((err) => {
                toast.error(err.response?.data?.message || "Registration failed");
                setError(err.response?.data?.message || "Registration failed");
            })
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 px-4">

            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">

                {/* Logo / Heading */}

                <div className="text-center mb-8">

                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(168,85,247,0.5)]">
                        ॐ
                    </div>

                    <h2 className="text-4xl font-bold text-white mt-5">
                        Create Account
                    </h2>

                    <p className="text-slate-300 mt-2">
                        Begin your spiritual journey
                    </p>

                </div>

                {/* Error Message */}

                {error && (
                    <p className="text-red-400 text-sm mb-4 text-center">
                        {error}
                    </p>
                )}

                {/* Form */}

                <div className="space-y-5">

                    <div>

                        <label className="block text-slate-300 mb-2 text-sm">
                            Full Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-slate-400 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                    </div>

                    <div>

                        <label className="block text-slate-300 mb-2 text-sm">
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-slate-400 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    <div>

                        <label className="block text-slate-300 mb-2 text-sm">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Create password"
                            className="w-full px-4 py-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-slate-400 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>

                    {/* Register Button */}

                    <button
                        onClick={handleRegister}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-lg hover:scale-[1.02] transition-all duration-300 shadow-lg"
                    >
                        Register
                    </button>

                </div>

                {/* Login Link */}

                <p className="text-sm text-center mt-6 text-slate-300">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-purple-400 hover:text-pink-400 font-semibold transition"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}


