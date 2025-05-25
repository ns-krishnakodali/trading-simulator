import "./globals.css";

import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import { NotificationProvider } from "@/contexts";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin", "math"],
});

export const metadata: Metadata = {
  title: "Trading Simulator",
  description: "A Simulator to test trading strategies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="assets/trading-simulator.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover"
        />
      </head>
      <body className={`${openSans.variable} antialiased`}>
        <NotificationProvider>
          <div className="flex">{children}</div>
        </NotificationProvider>
      </body>
    </html>
  );
}
