import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteLayout from "@/components/layout/SiteLayout";
import { Toaster } from "react-hot-toast";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Balmitra",
  description: "Multi Vendor Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
  className={`${inter.variable} font-sans bg-[#FAFAF8] text-[#111827]`}
>
  <Toaster position="top-right" />
  <SiteLayout>{children}</SiteLayout>
</body>
    </html>
  );
}
