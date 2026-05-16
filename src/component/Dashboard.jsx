import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import toast from "react-hot-toast";


export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const [count, setCount] = useState("");
  const [japaType, setJapaType] = useState("");
  const [records, setRecords] = useState([]);

  function fetchData() {
    axios.get("https://japacounter.onrender.com/api/japa", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

      .then(res => setRecords(res.data))
      .catch(err => console.log(err));
  }


  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);




  const navigate = useNavigate();

  const showHistory = () => {
    navigate("/history");
  };

  function addJapa() {
    if (!count || count <= 0 || !japaType) {
      toast.error("Please enter a valid count");
      return;
    }
    axios.post("https://japacounter.onrender.com/api/japa/add",
      { count: Number(count), japaType },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then(() => {
        toast.success("Japa added successfully 🙏");
        setCount("");
        setJapaType("");
        fetchData();
      })
      .catch((err) => {
        console.log(err)
        toast.error("Failed to add Japa");
      })

  };
  const ramaTotal = records
    .filter(item => item.japaType === "Rama Japa")
    .reduce((a, b) => a + b.count, 0);

  const gayathriTotal = records
    .filter(item => item.japaType === "Gayathri Japa")
    .reduce((a, b) => a + b.count, 0);

  const vishnuTotal = records
    .filter(item => item.japaType === "Vishnu Sahasranama")
    .reduce((a, b) => a + b.count, 0);
  // const total = records.reduce((a, b) => a + b.count, 0);

  return (
    <>
      {/* ✅ NAVBAR GOES HERE */}
      <Navbar />

      {/* Page Content */}

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 p-4 flex items-center justify-center">

        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl text-white">

          {/* Heading */}

          <div className="text-center mb-8">

            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-5xl shadow-[0_0_50px_rgba(168,85,247,0.5)] mb-5">
              📿
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Japa Dashboard
            </h1>

            <p className="text-slate-300 mt-3">
              Track your chanting progress daily
            </p>

          </div>

          {/* Input Section */}

          <div className="space-y-4 mb-6">

            {/* Select Japa Type */}

            <select
              value={japaType}
              onChange={(e) => setJapaType(e.target.value)}
              className="w-full px-4 py-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition"
            >
              <option className="bg-slate-900 text-white">
                Select Japa Type
              </option>

              <option className="bg-slate-900 text-white">
                Rama Japa
              </option>

              <option className="bg-slate-900 text-white">
                Gayathri Japa
              </option>

              <option className="bg-slate-900 text-white">
                Vishnu Sahasranama
              </option>
            </select>

            {/* Count Input + Button */}

            <div className="flex gap-3">

              <input
                type="number"
                className="w-full px-4 py-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-slate-400 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition"
                placeholder="Enter count"
                value={count}
                onChange={e => setCount(e.target.value)}
              />

              <button
                onClick={addJapa}
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 transition-all duration-300 px-6 rounded-2xl font-semibold shadow-lg"
              >
                Add
              </button>

            </div>

          </div>

          {/* Total Count */}
          <div className="grid grid-cols-1 gap-4">

            <div className="bg-white/10 p-4 rounded-2xl text-center">
              <p className="text-slate-300">
                Rama Japa
              </p>

              <h2 className="text-3xl font-bold text-purple-400">
                {ramaTotal}
              </h2>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl text-center">
              <p className="text-slate-300">
                Gayathri Japa
              </p>

              <h2 className="text-3xl font-bold text-pink-400">
                {gayathriTotal}
              </h2>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl text-center">
              <p className="text-slate-300">
                Vishnu Sahasranama
              </p>

              <h2 className="text-3xl font-bold text-indigo-400">
                {vishnuTotal}
              </h2>
            </div>

          </div>

          {/* History Button */}

          <div className="text-center">

            <button
              onClick={showHistory}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] transition-all duration-300 text-white font-semibold px-6 py-4 rounded-2xl shadow-lg"
            >
              View History
            </button>

          </div>

        </div>

      </div>

    </>
  );
}
