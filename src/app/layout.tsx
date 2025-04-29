import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import localFont from "next/font/local";
import ThemeProvider from "@/context/ThemeProvider";
import NavBar from "@/components/ui/navigation/navbar";

const inter = localFont({
  src: "../fonts/InterVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 600 700 800 900",
});

const SpaceGrotesk = localFont({
  src: "../fonts/SpaceGroteskVF.ttf",
  variable: "--font-space-grotesk",
  weight: "300 400 500 600 700",
});

export const metadata: Metadata = {
  title: "DevFlow - A Clone",
  description:
    "A community Driven Platform for asking and answering programming questions.",
  icons: {
    icon: "/images/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${SpaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
