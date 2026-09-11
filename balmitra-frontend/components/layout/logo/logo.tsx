import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  href?: string;
}

export default function Logo({
  href = "/",
}: LogoProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 shrink-0"
    >
      <Image
        src="/images/navlogo/balmitra-logo1.jpeg"
        alt="Balmitra"
        width={50}
        height={50}
        className="h-21 w-21 object-contain"
        priority
      />

      {/* <span className="text-2xl font-black tracking-tight text-[#0B1220]">
        BALMITRA
      </span> */}
    </Link>
  );
}

