const Input = ({ label, required, className = "", ...props }) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-600 ml-0.5">*</span>}
        </label>
      )}

      <input
        {...props}
        required={required}
        className={`mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm 
          focus:border-blue-500 focus:ring-blue-500 ${props.className || ""}`}
      />
    </div>
  );
};

export default Input;
