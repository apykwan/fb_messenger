import type { Metadata } from "next";

import Header from '@/components/header';
import Providers from './providers';
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
        <Providers>
          <Header />
          {children}
        </Providers>   
      </body>
    </html>
  );
}
