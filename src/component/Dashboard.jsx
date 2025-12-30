import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import toast from "react-hot-toast";


export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const [count, setCount] = useState("");
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
    if (!count || count <= 0) {
      toast.error("Please enter a valid count");
      return;
    }
    axios.post(
      "https://japacounter.onrender.com/api/japa/add",
      { count: Number(count) },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then(() => {
        toast.success("Japa added successfully 🙏");
        setCount("");
        fetchData();
      })
      .catch((err) => {
        console.log(err)
        toast.error("Failed to add Japa");
      })

  };

  const total = records.reduce((a, b) => a + b.count, 0);

  return (
    <>
      {/* ✅ NAVBAR GOES HERE */}
      <Navbar />

      {/* Page Content */}

      <div className="min-h-screen bg-orange-50 p-4">
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <div className="flex justify-between mb-4">
            <h1 className="text-xl font-bold">Japa Dashboard</h1>

          </div>

          <div className="flex gap-2">
            <input
              type="number"
              className="border p-2 w-full"
              placeholder="Enter count"
              value={count}
              onChange={e => setCount(e.target.value)}
            />
            <button
              onClick={addJapa}
              className="bg-orange-500 text-white px-4 rounded"
            >
              Add
            </button>
          </div>

          <div className="mt-4 text-center font-bold">
            Total Japa: {total}
          </div>
          <div className="mt-4 text-center font-bold">
            <button onClick={showHistory} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition duration-200">
              History
            </button>
          </div>
        </div>
      </div>

    </>
  );

}
