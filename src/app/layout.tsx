import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "ISS Tracker | Real-Time Mission Control",
  description: "Real-time tracking of the International Space Station",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          inter.variable,
          jetbrainsMono.variable,
          "antialiased bg-background text-text-primary min-h-screen flex flex-col overflow-hidden"
        )}
      >
        <div className="starfield" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
