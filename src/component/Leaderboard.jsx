import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";

export default function Leaderboard() {
    const { token } = useContext(AuthContext);
    const [leaders, setLeaders] = useState([]);
    const totalGayathri = leaders.reduce((total, user) => {

        const gayathri = user.japas.find(
            j => j.type === "Gayathri Japa"
        )?.count || 0;

        return total + gayathri;

    }, 0);

    useEffect(() => {
        axios.get("https://japacounter.onrender.com/api/japa/leaderboard", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data)
                setLeaders(res.data.leaderboard);
                // setGrandTotal(res.data.grandTotal);
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
                            Total Gyathri Japa by All Users
                        </p>

                        <h2 className="text-3xl mt-1">
                            {totalGayathri}
                        </h2>
                    </div>

                    <ul className="space-y-4 list-none">

                        {leaders
                            .sort((a, b) => {

                                const aGayathri =
                                    a.japas.find(
                                        j => j.type === "Gayathri Japa"
                                    )?.count || 0;

                                const bGayathri =
                                    b.japas.find(
                                        j => j.type === "Gayathri Japa"
                                    )?.count || 0;

                                return bGayathri - aGayathri;

                            })
                            .map((user, index) => (

                                <li
                                    key={index}
                                    className="bg-white/10 border border-white/10 hover:border-purple-500/40 backdrop-blur-lg p-6 rounded-2xl transition-all duration-300 hover:scale-[1.01] overflow-x-auto"
                                >

                                    <div className="overflow-x-auto">

                                        <table className="w-full text-center border-separate border-spacing-y-4">

                                            <thead>

                                                <tr className="text-slate-300 text-sm">

                                                    <th>
                                                        Rank
                                                    </th>

                                                    <th>
                                                        Name
                                                    </th>

                                                    <th>
                                                        Rama
                                                    </th>

                                                    <th>
                                                        Gayathri
                                                    </th>

                                                    <th>
                                                        Vishnu
                                                    </th>

                                                </tr>

                                            </thead>

                                            <tbody>

                                                <tr className="bg-white/5">

                                                    {/* Rank */}

                                                    <td className="py-4 rounded-l-2xl text-2xl font-bold text-white">
                                                        #{index + 1}
                                                    </td>

                                                    {/* Name */}

                                                    <td className="py-4 text-xl font-semibold text-white px-4 whitespace-nowrap">
                                                        {user.name}
                                                    </td>

                                                    {/* Rama */}

                                                    <td className="py-4 text-xl font-bold text-purple-400">

                                                        {
                                                            user.japas.find(
                                                                j => j.type === "Rama Japa"
                                                            )?.count || 0
                                                        }

                                                    </td>

                                                    {/* Gayathri */}

                                                    <td className="py-4 text-xl font-bold text-pink-400">

                                                        {
                                                            user.japas.find(
                                                                j => j.type === "Gayathri Japa"
                                                            )?.count || 0
                                                        }

                                                    </td>

                                                    {/* Vishnu */}

                                                    <td className="py-4 text-xl font-bold text-indigo-400">

                                                        {
                                                            user.japas.find(
                                                                j => j.type === "Vishnu Sahasranama"
                                                            )?.count || 0
                                                        }

                                                    </td>
                                                </tr>

                                            </tbody>

                                        </table>

                                    </div>

                                </li>
                            ))}

                    </ul>

                </div>

            </div>
        </>
    );
}
