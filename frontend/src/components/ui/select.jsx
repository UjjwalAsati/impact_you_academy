export function Select({ children, value, onValueChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      className="w-full border px-3 py-2 rounded-md"
    >
      {children}
    </select>
  );
}

export function SelectTrigger({ children, className = "" }) {
  return <>{children}</>;
}

export function SelectValue({ placeholder }) {
  return (
    <option value="" disabled>
      {placeholder}
    </option>
  );
}

export function SelectContent({ children }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
