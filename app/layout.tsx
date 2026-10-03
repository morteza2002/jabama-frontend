import type { Metadata } from "next";
import { AuthProvider } from "@/Context/AuthContext";
import { BookingProvider } from "../Context/BookingContext";
import localFont from "next/font/local";
import "./globals.css";
import StickyNavbar from "@/components/layout/StickyNavbar";
import Footer from "@/components/layout/Footer";
import ReduxProvider from "@/components/ReduxProvider/ReduxProvider";

import { cn } from "@/lib/utils";

const vazirmatn = localFont({
  src: [
    {
      path: "../public/fonts/Vazirmatn-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Vazirmatn-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Vazirmatn-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Vazirmatn-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-vazirmatn",
});
export const metadata: Metadata = {
  title: "جاباما",
  description: "رزرو اقامتگاه",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className={cn(vazirmatn.variable)}>
      <body suppressHydrationWarning>
        <AuthProvider>
          <ReduxProvider>
            {" "}
            <BookingProvider>
              {" "}
              <StickyNavbar /> <main>{children}</main> <Footer />
            </BookingProvider>
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
