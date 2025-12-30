import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./Navbar.jsx";

export default function History() {
  const { token } = useContext(AuthContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/japa/history", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setHistory(res.data))
    .catch(err => console.log(err));
  }, [token]);

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
              {history.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between bg-orange-100 p-2 rounded"
                >
                  <span>{item.date}</span>
                  <span className="font-bold">{item.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
