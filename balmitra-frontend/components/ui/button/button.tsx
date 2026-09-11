import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "danger" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-full px-6 py-3 text-sm font-semibold transition duration-300",
       {
  "bg-[#0B1220] text-white hover:bg-black": variant === "primary",
  "border border-[#0B1220] text-[#0B1220] bg-transparent hover:bg-[#0B1220] hover:text-white": variant === "outline",
  "bg-red-600 text-white hover:bg-red-700": variant === "danger",
  "bg-gray-200 text-black hover:bg-gray-300": variant === "secondary",
},
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}