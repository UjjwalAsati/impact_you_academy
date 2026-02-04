import { forwardRef } from 'react';

const Textarea = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <textarea
      className={`w-full px-4 py-3 rounded-lg border-2 border-slate-200 bg-white text-charcoal placeholder:text-slate-400 transition-all duration-300 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/20 hover:border-slate-300 resize-none ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
