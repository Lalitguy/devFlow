import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import localFont from "next/font/local";
import ThemeProvider from "@/context/ThemeProvider";
import { Toaster } from "sonner";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

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
  generator: "Next.js",
  applicationName: "DevFlow",
  referrer: "origin-when-cross-origin",
  keywords: [
    "webb development",
    "programming",
    "questions",
    "answers",
    "community",
  ],
  authors: [{ name: "Lalitguy" }, { name: "Strawhats" }],
  creator: "Lalitguy",
  publisher: "Dev Flow",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
    date: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/site-logo.svg",
  },
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <SessionProvider session={session}>
        <body
          className={`${inter.className} ${SpaceGrotesk.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster position="top-center" richColors />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
