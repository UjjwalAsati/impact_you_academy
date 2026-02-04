export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black ${className}`}
      {...props}
    />
  );
}
