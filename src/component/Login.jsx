import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const navigate = useNavigate();

  function handleLogin() {
     if (!email || !password) {
    toast.error("Email and password are required");
    return;
  }
    axios.post("http://localhost:5000/api/auth/login", {
      email,
      password
    })
      .then((res) => {
        toast.success(`Welcome ${res.data.name} 🙏`);
        login(res.data.token, res.data.name);

        navigate("/dashboard");
      }).catch((err) => {
        console.log(err)
      })


  };

  return (
    <div className="h-screen flex items-center justify-center bg-orange-50">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-orange-500 text-white w-full py-2 rounded"
        >
          Login
        </button>
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-orange-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
