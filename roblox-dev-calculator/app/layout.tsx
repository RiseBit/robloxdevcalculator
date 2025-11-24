import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Roblox Dev Calculator - DevEx & Earnings Estimator | RiseBit',
  description: 'Free Roblox developer tools: USD to Robux converter, DevEx calculator, marketplace tax calculator, and game earnings estimator. Calculate your Roblox earnings instantly with accurate rates.',
  keywords: ['roblox devex calculator', 'robux to usd', 'roblox developer exchange', 'robux calculator', 'roblox earnings', 'devex rate', 'roblox marketplace tax', 'rocalc'],
  authors: [{ name: '(RiseBit)', url: 'https://x.com/RiseBit_Dev' }],
  creator: 'RiseBit',
  publisher: 'RiseBit',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Roblox Dev Calculator - DevEx & Earnings Tools',
    description: 'Calculate Roblox DevEx earnings, USD to Robux conversions, marketplace tax, and game revenue. Built by a real Roblox developer.',
    url: 'https://robloxdevcalculator.com',
    siteName: 'Roblox Dev Calculator by RiseBit',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Roblox Dev Calculator Tools',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roblox Dev Calculator - DevEx Tools',
    description: 'Calculate Roblox DevEx earnings and conversions',
    creator: '@RiseBit_Dev',
    images: ['/og-image.png'],
  },

}

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
        {children}
      </body>
    </html>
  );
}
