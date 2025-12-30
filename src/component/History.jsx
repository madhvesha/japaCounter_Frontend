import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./Navbar.jsx";

export default function History() {
  const { token } = useContext(AuthContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get("https://japacounter.onrender.com/api/japa/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setHistory(res.data))
      .catch((err) => console.log(err));
  }, [token]);

  /* ✅ SUM JAPA COUNTS BY DATE */
  const summedHistory = history.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = 0;
    }
    acc[item.date] += item.count;
    return acc;
  }, {});

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-orange-50 p-4">
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold text-center mb-4">
            📅 My Japa History
          </h2>

          {history.length === 0 ? (
            <p className="text-center text-gray-500">
              No history found
            </p>
          ) : (
            <ul className="space-y-2">
              {Object.entries(summedHistory).map(([date, totalCount]) => (
                <li
                  key={date}
                  className="flex justify-between bg-orange-100 p-2 rounded"
                >
                  <span className="font-medium">{date}</span>
                  <span className="font-bold">{totalCount}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
