
import { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import pixelmatch from "pixelmatch";
import axios from "axios";

function Camera() {
  const webcamRef = useRef(null);
  const previousFrame = useRef(null);
  const lastSavedAt = useRef(0);

  const [motion, setMotion] = useState(false);
  const [difference, setDifference] = useState(0);

  const detectMotion = useCallback(async () => {
    if (!webcamRef.current) return;

    const currentImage = webcamRef.current.getScreenshot();
    if (!currentImage) return;

    const previousImage = previousFrame.current;
    previousFrame.current = currentImage;

    if (!previousImage) return;

    const loadImage = (src) =>
      new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
      });

    try {
      const [previous, current] = await Promise.all([
        loadImage(previousImage),
        loadImage(currentImage),
      ]);

      const width = 320;
      const height = 240;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d", {
        willReadFrequently: true,
      });

      if (!ctx) return;

      ctx.drawImage(previous, 0, 0, width, height);
      const previousData = ctx.getImageData(0, 0, width, height);

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(current, 0, 0, width, height);
      const currentData = ctx.getImageData(0, 0, width, height);

      const output = new Uint8Array(width * height * 4);

      const diff = pixelmatch(
        previousData.data,
        currentData.data,
        output,
        width,
        height,
        { threshold: 0.1 }
      );

      const percent = Number(
        ((diff / (width * height)) * 100).toFixed(2)
      );

      setDifference(percent);
      console.log("Motion comparison:", percent + "%");

      // Initial testing threshold
      if (percent > 2) {
        setMotion(true);

        const userId = localStorage.getItem("userId");
        const now = Date.now();

        if (!userId) {
          console.error("User ID missing. Please log in again.");
        } else if (
          import.meta.env.VITE_API_URL &&
          now - lastSavedAt.current > 5000
        ) {
          lastSavedAt.current = now;

          try {
            
const token = localStorage.getItem("token");

const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/motion/save`,
  {
    user: userId,
    percentage: percent,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

            console.log("Motion event saved:", response.data);
          } catch (error) {
            console.error(
              "Motion save failed:",
              error.response?.data || error.message
            );
          }
        } else if (!import.meta.env.VITE_API_URL) {
          console.error("VITE_API_URL is missing.");
        }

        setTimeout(() => setMotion(false), 1500);
      } else {
        setMotion(false);
      }
    } catch (error) {
      console.error("Frame comparison failed:", error);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      detectMotion();
    }, 2000);

    return () => clearInterval(interval);
  }, [detectMotion]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl overflow-hidden border border-cyan-400/30">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          audio={false}
          className="w-full"
        />
      </div>

      <div className="text-center">
        <h2
          className={`text-xl font-bold ${
            motion ? "text-red-400" : "text-green-400"
          }`}
        >
          {motion ? "🚨 Motion Detected" : "🟢 Monitoring"}
        </h2>

        <p className="text-slate-400 mt-2">
          Movement: {difference}%
        </p>
      </div>
    </div>
  );
}

export default Camera;
