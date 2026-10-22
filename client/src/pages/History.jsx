
import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEvents(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error(
          "History fetch failed:",
          error.response?.data || error.message
        );
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        Motion History
      </h1>

      <table className="w-full border border-slate-700">
        <thead className="bg-slate-800">
          <tr>
            <th className="p-4">Date &amp; Time</th>
            <th className="p-4">Motion %</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr
              key={event._id}
              className="border-t border-slate-700 text-center"
            >
              <td className="p-4">
                {new Date(event.detectedAt).toLocaleString()}
              </td>

              <td className="p-4">
                {Number(event.percentage).toFixed(2)}%
              </td>

              <td className="p-4 text-red-400">
                🚨 {event.status}
              </td>
            </tr>
          ))}

          {events.length === 0 && (
            <tr>
              <td colSpan={3} className="p-4 text-center text-slate-400">
                No motion events found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default History;
