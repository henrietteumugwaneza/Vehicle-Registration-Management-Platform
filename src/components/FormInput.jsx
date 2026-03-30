export default function FormInput({ label, error, as: Tag = "input", children, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="label">{label}</label>}
      {Tag === "select" ? (
        <select
          {...props}
          className={`input-field ${error ? "input-error" : ""} ${props.className || ""}`}
        >
          {children}
        </select>
      ) : (
        <Tag
          {...props}
          className={`input-field ${error ? "input-error" : ""} ${props.className || ""}`}
        />
      )}
      {error && <p className="text-red-400 text-xs mt-0.5">{error}</p>}
    </div>
  );
}
