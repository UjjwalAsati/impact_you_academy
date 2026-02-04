import { forwardRef } from 'react';

const Card = forwardRef(({ children, className = "", variant = "default", hover = true, ...props }, ref) => {
  const baseStyles = "rounded-xl bg-white transition-all duration-400";
  
  const variants = {
    default: "border border-slate-200 shadow-soft",
    elevated: "shadow-medium",
    outline: "border-2 border-slate-200",
    glass: "bg-white/80 backdrop-blur-sm border border-white/20 shadow-medium",
  };
  
  const hoverStyles = hover ? "hover:shadow-hard hover:-translate-y-2 hover:border-gold/30" : "";
  
  const variantClass = variants[variant] || variants.default;
  
  return (
    <div
      ref={ref}
      className={`${baseStyles} ${variantClass} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export { Card };
