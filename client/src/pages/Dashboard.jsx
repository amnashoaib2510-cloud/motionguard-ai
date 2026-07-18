import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Camera from "../components/Camera";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [motionAlert, setMotionAlert] = useState(false);

  useEffect(() => {
    fetchEvents();

    const interval = setInterval(() => {
      fetchEvents();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/history"
      );

      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const todayEvents = events.filter((event) => {
    if (!event.createdAt) return false;

    return (
      new Date(event.createdAt).toDateString() ===
      new Date().toDateString()
    );
  });

  const averageMotion =
    events.length > 0
      ? (
          events.reduce(
            (sum, event) => sum + Number(event.percentage || 0),
            0
          ) / events.length
        ).toFixed(2)
      : 0;

  const chartData = events.map((event, index) => ({
    name: `#${index + 1}`,
    motion: Number(event.percentage || 0),
  }));

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      {/* Header */}

      <div className="flex flex-col items-center">

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold text-cyan-400 text-center"
        >
          MotionGuard AI Dashboard 🚀
        </motion.h1>

        <p className="text-slate-400 mt-3">
          AI Powered Real-Time Motion Detection System
        </p>

        <motion.div
          initial={{ opacity: 0, scale: .8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .7 }}
          className="mt-8"
        >
          <Camera />
        </motion.div>

      </div>

      {/* Alert */}

      <div className="flex justify-center mt-6">

        <button
          onClick={() => setMotionAlert(true)}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-bold"
        >
          🚨 Test Motion Alert
        </button>

      </div>

      {motionAlert && (

        <div className="mt-6 bg-red-600/20 border border-red-500 rounded-xl p-5">

          <h2 className="text-red-400 text-2xl font-bold">
            🚨 Motion Detected
          </h2>

          <p className="mt-2">
            Security Alert: Movement detected by camera.
          </p>

          <button
            onClick={() => setMotionAlert(false)}
            className="mt-4 bg-slate-800 px-5 py-2 rounded-lg"
          >
            Dismiss
          </button>

        </div>

      )}

      {/* Cards */}

      <div className="grid md:grid-cols-4 gap-6 mt-10">

        <div className="bg-slate-900 rounded-2xl p-6 border border-cyan-500/20">
          <h3>📷 Camera Status</h3>
          <h2 className="text-2xl text-green-400 mt-3">
            Online
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-cyan-500/20">
          <h3>🚨 Motion Detection</h3>
          <h2 className="text-2xl text-cyan-400 mt-3">
            Active
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-cyan-500/20">
          <h3>📊 Total Events</h3>
          <h2 className="text-4xl text-cyan-400 mt-3 font-bold">
            {events.length}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-cyan-500/20">
          <h3>📅 Today's Events</h3>
          <h2 className="text-4xl text-cyan-400 mt-3 font-bold">
            {todayEvents.length}
          </h2>
        </div>

      </div>

      {/* Average */}

      <div className="flex justify-center mt-8">

        <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-6 w-80">

          <h3>📈 Average Motion</h3>

          <h2 className="text-4xl text-cyan-400 mt-4 font-bold">
            {averageMotion}%
          </h2>

          <p className="text-slate-400 mt-2">
            Average Detection Level
          </p>

        </div>

      </div>

      {/* Chart */}

      <div className="mt-10 bg-slate-900 rounded-2xl border border-cyan-500/20 p-6">

        <h2 className="text-xl font-bold text-cyan-400 mb-5">
          📊 Motion Activity Chart
        </h2>

        <ResponsiveContainer width="100%" height={320}>

          <LineChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="motion"
              stroke="#22d3ee"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* History */}

      <div className="mt-10 bg-slate-900 rounded-2xl border border-cyan-500/20 p-6">

        <h2 className="text-xl font-bold text-cyan-400 mb-5">
          🕒 Motion History
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-700 text-slate-400">

                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Motion %</th>
                <th className="p-3 text-left">Date</th>

              </tr>

            </thead>

            <tbody>

              {events.length === 0 ? (

                <tr>

                  <td
                    colSpan="3"
                    className="text-center p-6 text-slate-400"
                  >
                    No Motion Events Found
                  </td>

                </tr>

              ) : (

                events.map((event, index) => (

                  <tr
                    key={event._id}
                    className="border-b border-slate-800"
                  >

                    <td className="p-3">
                      {index + 1}
                    </td>

                    <td className="p-3 text-cyan-400">
                      {event.percentage}%
                    </td>

                    <td className="p-3">
                      {new Date(event.createdAt).toLocaleString()}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;