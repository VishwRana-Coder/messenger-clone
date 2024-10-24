import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'
import ToasterContext from "./context/ToasterContext";
const inter = Inter({subsets: ["latin"]})
import AuthContext from "@/app/context/AuthContext";
import ActiveStatus from "./Components/ActiveStatus";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>

      </body>
    </html>
  );
}
