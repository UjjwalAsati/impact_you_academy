export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-lg border p-6 bg-white ${className}`}>
      {children}
    </div>
  );
}
