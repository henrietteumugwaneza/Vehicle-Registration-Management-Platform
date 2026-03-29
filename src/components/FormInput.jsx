export default function FormInput({ label, error, ...props }) {
  return (
    <div className="mb-3">
      <label>{label}</label>
      <input
        {...props}
        className={`border p-2 w-full ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}