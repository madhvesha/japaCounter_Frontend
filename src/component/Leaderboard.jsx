import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";

export default function Leaderboard() {
    const { token } = useContext(AuthContext);
    const [leaders, setLeaders] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:5000/api/japa/leaderboard", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setLeaders(res.data.leaderboard);
                setGrandTotal(res.data.grandTotal);
            })
            .catch(err => console.log(err));
    }, [token]);
    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-orange-50 p-4">
                <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-bold text-center mb-4">
                        🏆 Leaderboard
                    </h2>
                    <div className="text-center text-orange-600 font-bold mb-4">
                        Total Japa by All Users: {grandTotal}
                    </div>

                    <ul className="space-y-2">
                        {leaders.map((user, index) => (
                            <li
                                key={index}
                                className="flex justify-between bg-orange-100 p-2 rounded"
                            >
                                <span>
                                    #{index + 1} {user.name}
                                </span>
                                <span className="font-bold">
                                    {user.totalJapa}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
