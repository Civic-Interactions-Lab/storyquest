import type { Metadata } from "next";
import { Geist, Geist_Mono, Patrick_Hand, Short_Stack } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const patrickHand = Patrick_Hand({
  weight: "400",
  variable: "--font-patrick-hand",
  subsets: ["latin"],
});

const shortStack = Short_Stack({
  weight: "400",
  variable: "--font-short-stack",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StoryQuest",
  description: "StoryQuest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            {/* Google Fonts import */}
            <link href="https://fonts.googleapis.com/css2?family=Slackey&family=Patrick+Hand&family=Short+Stack&display=swap" rel="stylesheet" />
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${patrickHand.variable} ${shortStack.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}