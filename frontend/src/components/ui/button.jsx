import { forwardRef } from 'react';

const Button = forwardRef((
  { children, className = "", variant = "default", size = "default", disabled = false, ...props },
  ref
) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden";
  
  const variants = {
    default: "bg-gradient-to-r from-navy to-navy-light text-white hover:shadow-glow-navy hover:-translate-y-1 focus:ring-navy",
    outline: "border-2 border-navy text-navy hover:bg-navy hover:text-white hover:-translate-y-1 focus:ring-navy",
    gold: "bg-gradient-to-r from-gold to-gold-light text-navy hover:shadow-glow-gold hover:-translate-y-1 hover:scale-105 focus:ring-gold font-bold",
    ghost: "text-navy hover:bg-navy/10 hover:text-navy-dark",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  
  const variantClass = variants[variant] || variants.default;
  const sizeClass = sizes[size] || sizes.default;
  
  return (
    <button
      ref={ref}
      className={`${baseStyles} ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {/* Shimmer effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700"></span>
    </button>
  );
});

Button.displayName = "Button";

export { Button };
