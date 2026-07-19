import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("https://motionguard-ai-production.up.railway.app/api/history");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        Motion History
      </h1>

      <table className="w-full border border-slate-700">
        <thead className="bg-slate-800">
          <tr>
            <th className="p-4">Date & Time</th>
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
        </tbody>
      </table>
    </div>
  );
}

export default History;