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


        try {
            await axios.post("http://localhost:5000/api/auth/register", {
                name,
                email,
                password
            });

            // After successful registration → go to login
            toast.success("Registration successful! Please login");
            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration failed");
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-50">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center text-orange-600 mb-4">
                    Register
                </h2>

                {error && (
                    <p className="text-red-500 text-sm mb-3 text-center">
                        {error}
                    </p>
                )}

                <input
                    type="text"
                    placeholder="Name"
                    className="border p-2 w-full mb-3 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full mb-3 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full mb-4 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleRegister}
                    className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded"
                >
                    Register
                </button>

                <p className="text-sm text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-orange-500 font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
