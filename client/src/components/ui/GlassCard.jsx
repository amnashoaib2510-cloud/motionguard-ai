function GlassCard({ children }) {
  return (
    <div
      className="
        w-full max-w-md
        rounded-2xl
        bg-slate-900/60
        backdrop-blur-xl
        border border-cyan-400/20
        shadow-[0_0_40px_rgba(34,211,238,0.15)]
        p-8
      "
    >
      {children}
    </div>
  );
}

export default GlassCard;