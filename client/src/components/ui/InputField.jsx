function InputField({ label, type, placeholder, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-slate-300">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full
          px-4
          py-3
          rounded-xl
          bg-slate-950/70
          border border-slate-700
          text-white
          placeholder-slate-500
          outline-none
          transition
          duration-300
          focus:border-cyan-400
          focus:ring-2
          focus:ring-cyan-400/30
        "
      />
    </div>
  );
}

export default InputField;