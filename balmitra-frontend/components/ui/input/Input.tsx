import { InputProps } from "./input.types";
import clsx from "clsx";

export default function Input({
  className,
  ...props
}: InputProps) {
  return (
    <input
      className={clsx(
        "w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition-all",
        "focus:border-blue-600 focus:ring-2 focus:ring-blue-200",
        className
      )}
      {...props}
    />
  );
}