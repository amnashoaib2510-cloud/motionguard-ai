import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import pixelmatch from "pixelmatch";
import axios from "axios";

function Camera() {
  const webcamRef = useRef(null);
  const previousFrame = useRef(null);

  const [motion, setMotion] = useState(false);
  const [difference, setDifference] = useState(0);

  const detectMotion = () => {
    if (!webcamRef.current) return;

    const currentImage = webcamRef.current.getScreenshot();

    if (!currentImage) return;

    if (previousFrame.current) {
      const current = new Image();
      const previous = new Image();

      current.src = currentImage;
      previous.src = previousFrame.current;

      current.onload = async () => {
        const canvas = document.createElement("canvas");

        const ctx = canvas.getContext("2d", {
          willReadFrequently: true,
        });

        canvas.width = current.width;
        canvas.height = current.height;

        ctx.drawImage(previous, 0, 0);

        const previousData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(current, 0, 0);

        const currentData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );

        const diff = pixelmatch(
          previousData.data,
          currentData.data,
          null,
          canvas.width,
          canvas.height,
          {
            threshold: 0.1,
          }
        );

        const percent = Number(
          ((diff / (canvas.width * canvas.height)) * 100).toFixed(2)
        );

        setDifference(percent);

        if (percent > 5) {
          setMotion(true);

          console.log("Motion Percentage:", percent);
          console.log("User ID:", localStorage.getItem("userId"));

          try {
            const res = await axios.post(
              "https://motionguard-ai-production.up.railway.app/api/motion/save",
              {
                user: localStorage.getItem("userId"),
                percentage: percent,
              }
            );

            console.log("Saved:", res.data);
          } catch (err) {
            console.log(
              "Save Error:",
              err.response?.data || err.message
            );
          }

          setTimeout(() => {
            setMotion(false);
          }, 1500);
        }
      };
    }

    previousFrame.current = currentImage;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      detectMotion();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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