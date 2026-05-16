// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext.jsx";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function Login() {
//   const { login } = useContext(AuthContext);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");



//   const navigate = useNavigate();

//   function handleLogin() {
//      if (!email || !password) {
//     toast.error("Email and password are required");
//     return;
//   }
//     axios.post("https://japacounter.onrender.com/api/auth/login", {
//       email,
//       password
//     })
//       .then((res) => {
//         toast.success(`Welcome ${res.data.name} 🙏`);
//         login(res.data.token, res.data.name);

//         navigate("/dashboard");
//       }).catch((err) => {
//         console.log(err)
//       })


//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-orange-50">
//       <div className="bg-white p-6 rounded shadow w-80">
//         <h2 className="text-xl font-bold mb-4">Login</h2>

//         <input
//           className="border p-2 w-full mb-2"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           className="border p-2 w-full mb-2"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           onClick={handleLogin}
//           className="bg-orange-500 text-white w-full py-2 rounded"
//         >
//           Login
//         </button>
//         <p className="text-sm text-center mt-4">
//           Don’t have an account?{" "}
//           <Link
//             to="/register"
//             className="text-orange-500 font-semibold hover:underline"
//           >
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">

        {/* Logo / Heading */}

        <div className="text-center mb-8">

          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(168,85,247,0.5)]">
            ॐ
          </div>

          <h1 className="text-4xl font-bold text-white mt-5">
            Welcome Back
          </h1>

          <p className="text-slate-300 mt-2">
            Continue your spiritual journey
          </p>

        </div>

        {/* Form */}

        <form className="space-y-5">

          <div>
            <label className="block text-slate-300 mb-2 text-sm">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-slate-400 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2 text-sm">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-slate-400 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition"
            />
          </div>

          {/* Forgot Password */}

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-purple-400 hover:text-purple-300 transition"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-lg hover:scale-[1.02] transition-all duration-300 shadow-lg"
          >
            Login
          </button>

        </form>

        {/* Register */}

        <p className="text-center text-slate-300 mt-8">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-purple-400 hover:text-pink-400 font-semibold transition"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}