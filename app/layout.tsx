import type { Metadata } from "next";
import { Toaster } from "sonner";
import localFont from "next/font/local";
import { ResearchPaperProvider } from '@/app/ResearchPaperContext';
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Axy",
  description: "Scientific Conferencing Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ResearchPaperProvider>
        <Toaster richColors/>
        {children}
        </ResearchPaperProvider>
      </body>
    </html>
  );
}
