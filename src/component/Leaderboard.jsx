import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";

export default function Leaderboard() {
    const { token } = useContext(AuthContext);
    const [leaders, setLeaders] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);

    useEffect(() => {
        axios.get("https://japacounter.onrender.com/api/japa/leaderboard", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data)
                setLeaders(res.data.leaderboard);
                setGrandTotal(res.data.grandTotal);
            })
            .catch(err => console.log(err));
    }, [token]);
    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 p-4">

                <div className="max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl text-white">

                    <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                        🏆 Leaderboard
                    </h2>

                    <div className="text-center bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl py-4 px-4 font-bold text-white shadow-lg mb-6">
                        <p className="text-sm text-white/80">
                            Total Japa by All Users
                        </p>

                        <h2 className="text-3xl mt-1">
                            {grandTotal}
                        </h2>
                    </div>

                    <ul className="space-y-4">

                        {leaders.map((user, index) => (

                            <li
                                key={index}
                                className="bg-white/10 border border-white/10 hover:border-purple-500/40 backdrop-blur-lg p-4 rounded-2xl transition-all duration-300 hover:scale-[1.01]"
                            >

                                <div className="grid grid-cols-5 gap-4 items-center text-center">

                                    {/* Name */}

                                    <div>

                                        <p className="font-bold text-lg text-white">
                                            #{index + 1} {user.name}
                                        </p>

                                    </div>

                                    {/* Rama */}

                                    <div>

                                        <p className="text-sm text-slate-300">
                                            Rama Japa
                                        </p>

                                        <h3 className="text-xl font-bold text-purple-400">

                                            {
                                                user.japas.find(
                                                    j => j.type === "Rama Japa"
                                                )?.count || 0
                                            }

                                        </h3>

                                    </div>

                                    {/* Gayathri */}

                                    <div>

                                        <p className="text-sm text-slate-300">
                                            Gayathri Japa
                                        </p>

                                        <h3 className="text-xl font-bold text-pink-400">

                                            {
                                                user.japas.find(
                                                    j => j.type === "Gayathri Japa"
                                                )?.count || 0
                                            }

                                        </h3>

                                    </div>

                                    {/* Vishnu */}

                                    <div>

                                        <p className="text-sm text-slate-300">
                                            Vishnu Sahasranama
                                        </p>

                                        <h3 className="text-xl font-bold text-indigo-400">

                                            {
                                                user.japas.find(
                                                    j => j.type === "Vishnu Sahasranama"
                                                )?.count || 0
                                            }

                                        </h3>

                                    </div>

                                    {/* Total */}

                                    <div>

                                        <p className="text-sm text-slate-300">
                                            Total
                                        </p>

                                        <h3 className="text-2xl font-bold text-yellow-400">
                                            {user.totalJapa}
                                        </h3>

                                    </div>

                                </div>

                            </li>
                        ))}

                    </ul>

                </div>

            </div>
        </>
    );
}
