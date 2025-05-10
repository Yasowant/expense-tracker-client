
import { Link } from "react-router-dom";

interface LogoProps {
  size?: "small" | "medium" | "large";
  showText?: boolean;
}

export function Logo({ size = "medium", showText = true }: LogoProps) {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-10 h-10",
  };

  return (
    <Link to="/" className="flex items-center gap-2">
      <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground`}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-2/3 h-2/3"
        >
          <path d="M12 2v3" />
          <path d="M15 5h-6" />
          <path d="M4.5 10h15" />
          <path d="M4.5 15h15" />
          <path d="M7 20h10" />
          <path d="M7 10v10" />
          <path d="M17 10v10" />
        </svg>
      </div>
      {showText && <span className="font-semibold">DivideShare</span>}
    </Link>
  );
}
