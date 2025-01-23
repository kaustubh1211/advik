"use client";
import { Open_Sans, Rajdhani } from "next/font/google";
import "@/assets/css/font-icons.css";
import "@/assets/css/plugins.css";
import "./globals.css";
import "@/assets/css/responsive.css";
import Script from "next/script";
import { Suspense } from "react";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

const open_sans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--ltn__body-font",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--ltn__heading-font",
});

export default  function  RootLayout({ children, session }) {

  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${rajdhani.variable} ${open_sans.variable}`}
    >
      <body className={open_sans.className}>
        {/* Ensure consistent session context */}
        <SessionProvider session={session}>
          {/* Render children with a fallback */}
          <Suspense fallback={<div> </div>}>
            {children}
          </Suspense>
        </SessionProvider>

        {/* Add external scripts */}
        <Script src="/plugins.js" />
        <Script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeeHDCOXmUMja1CFg96RbtyKgx381yoBU"
       
        />
      </body>
    </html>
  );
}
