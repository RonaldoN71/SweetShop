

export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow-md overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
