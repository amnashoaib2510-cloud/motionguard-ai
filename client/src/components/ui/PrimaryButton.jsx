import { motion } from "framer-motion";

function PrimaryButton({ text, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="
        w-full
        py-3
        rounded-xl
        bg-cyan-400
        text-slate-950
        font-bold
        text-lg
        shadow-[0_0_25px_rgba(34,211,238,0.5)]
        transition
        duration-300
      "
    >
      {text}
    </motion.button>
  );
}

export default PrimaryButton;