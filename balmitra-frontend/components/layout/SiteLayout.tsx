"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/footer/Footer";
import AuthModal from "@/components/auth/AuthModal";
// import TopOfferBar from "@/components/layout/TopOfferBar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdminPage =
    pathname.startsWith("/admin");

  const isOrderSuccessPage =
    pathname.startsWith("/order-success");

  // Pages with custom layouts
  if (
    isAdminPage ||
    isOrderSuccessPage
  ) {
    return <>{children}</>;
  }

  return (
    <>
      {/* <TopOfferBar /> */}

      <Navbar />

      <main>{children}</main>

      <Footer />

      <AuthModal />
    </>
  );
}