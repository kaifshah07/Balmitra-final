import Link from "next/link";
import { navLinks } from "./navLinks";

export default function Navigation() {
  return (
    <nav className="hidden xl:flex items-center gap-8">
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="text-sm font-medium text-gray-600 transition duration-300 hover:text-black">
          {link.name}
        </Link>
      ))}
    </nav>
  );
}