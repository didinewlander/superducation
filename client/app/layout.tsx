import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils"
import { Loading } from "@/components/Loading";
import { ToastProvider } from "@/components/providers/toaster-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export const metadata: Metadata = {
  title: "Superducation - Start Learning",
  description: "Online studying and teaching platform",
  icons: ['../public/בשטח (2).png'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >          
      <ToastProvider />

        <Loading>
          {children}
        </Loading>

      </body>
    </html>
  )
}
