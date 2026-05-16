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

      acc[item.date] = {
        total: 0,
        japas: []
      };

    }

    acc[item.date].total += item.count;

    acc[item.date].japas.push({
      type: item.japaType,
      count: item.count
    });

    return acc;

  }, {});

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 p-4 text-white">

        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">

          {/* Heading */}

          <div className="text-center mb-8">

            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(168,85,247,0.5)] mb-4">
              📿
            </div>

            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              My Japa History
            </h2>

            <p className="text-slate-300 mt-2">
              Track your spiritual progress journey
            </p>

          </div>

          {/* History List */}

          {history.length === 0 ? (

            <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">

              <h3 className="text-2xl font-semibold text-white mb-2">
                No History Found
              </h3>

              <p className="text-slate-400">
                Your completed chanting rounds will appear here.
              </p>

            </div>

          ) : (

            <ul className="space-y-5">

              {Object.entries(summedHistory).map(([date, data]) => (

                <li
                  key={date}
                  className="group bg-white/10 border border-white/10 hover:border-purple-500/40 backdrop-blur-lg rounded-2xl px-6 py-5 flex justify-between items-center transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-purple-500/10"
                >

                  {/* Date */}

                  <div>

                    <p className="text-slate-400 text-sm">
                      Chant Date
                    </p>

                    <h3 className="text-xl font-semibold text-white">
                      {date}
                    </h3>

                  </div>
                  <div className="flex flex-col gap-2">

                    {data.japas.map((japa, index) => (

                      <div
                        key={index}
                        className="bg-white/5 px-4 py-2 rounded-xl"
                      >

                        <p className="text-slate-300 text-sm">
                          {japa.type}
                        </p>

                        <h4 className="text-lg font-semibold text-purple-400">
                          {japa.count}
                        </h4>

                      </div>

                    ))}

                  </div>

                  {/* Count */}

                  <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-3 rounded-2xl shadow-lg text-center min-w-[120px]">

                    <p className="text-white/80 text-sm">
                      Total Count
                    </p>

                    <h3 className="text-2xl font-bold text-white">
                      {data.total}
                    </h3>

                  </div>

                </li>

              ))}

            </ul>

          )}

        </div>

      </div>
    </>
  );

}
