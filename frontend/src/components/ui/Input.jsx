

export default function Input({ className = "", icon = null, ...props }) {
  if (!icon) {
    return (
      <input
        {...props}
        className={
          `w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 ${className}`
        }
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
        {icon}
      </div>
      <input
        {...props}
        className={
          `w-full rounded-md border border-gray-200 bg-gray-50 pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300`
        }
      />
    </div>
  );
}
