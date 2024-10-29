import type { Metadata } from "next";

import Header from '@/components/header';
import "./globals.css";

export const metadata: Metadata = {
  title: "Messenger",
  description: "Feel free to drop a message",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
