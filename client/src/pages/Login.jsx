import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

import GlassCard from "../components/ui/GlassCard";
import InputField from "../components/ui/InputField";
import PrimaryButton from "../components/ui/PrimaryButton";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const handleLogin = async () => {

    try {

      setLoading(true);

      const response = await axios.post(
        "https://motionguard-ai-production.up.railway.app/api/auth/login",
        {
          email,
          password,
        }
      );


      console.log("Login Response:", response.data);


     localStorage.setItem(
  "token",
  response.data.token
);

if (response.data.user) {

  localStorage.setItem(
    "userId",
    response.data.user.id
  );

  localStorage.setItem(
    "userName",
    response.data.user.name
  );

  localStorage.setItem(
    "userEmail",
    response.data.user.email
  );

  console.log(
    "Saved User ID:",
    response.data.user.id
  );

}

      setMessage("✅ Login Successful");


      setTimeout(() => {

        navigate("/dashboard");

      }, 1000);


    } catch (error) {


      console.error(error);


      setMessage(
        error.response?.data?.message ||
        "❌ Login Failed"
      );


    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">


      <div className="absolute w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl top-10 left-10"></div>

      <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl bottom-10 right-10"></div>



      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >


        <GlassCard>


          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="flex justify-center mb-5"
          >

            <ShieldCheck
              size={70}
              className="text-cyan-400"
            />

          </motion.div>



          <h1 className="text-4xl font-bold text-center text-cyan-400 mb-2">
            MotionGuard AI
          </h1>


          <p className="text-slate-400 text-center mb-8">
            Welcome Back 👋
          </p>



          {message && (

            <p className="text-center text-cyan-400 mb-5">
              {message}
            </p>

          )}




          <div className="space-y-5">


            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />



            <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />



            <PrimaryButton

              text={
                loading 
                ? "Logging in..."
                : "Login"
              }

              onClick={handleLogin}

            />


          </div>


        </GlassCard>


      </motion.div>


    </div>

  );

}


export default Login;