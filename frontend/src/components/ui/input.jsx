import { forwardRef } from 'react';

const Input = forwardRef(({ className = "", type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={`w-full px-4 py-3 rounded-lg border-2 border-slate-200 bg-white text-charcoal placeholder:text-slate-400 transition-all duration-300 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/20 hover:border-slate-300 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
