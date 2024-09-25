import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import OurProviders from "@/components/provider";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const pretnedard = localFont({
  src: "../lib/PretendardVariable.woff2",
  display: "swap",
  weight: "400 700",
  variable: "--font-pretendard",
});

const suit = localFont({
  src: "../lib/SUIT-Variable.woff2",
  display: "swap",
  weight: "400 700",
  variable: "--font-suit",
});

export const metadata: Metadata = {
  title: "MileQue",
  description: "Get Insight of your marketing data",
  icons: {
    icon: "/lllllast.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager
        gtmId={process.env.NEXT_PUBLIC_GTM_ID || "undefined-gtmId"}
      />
      <body className={suit.className}>
        <OurProviders>{children}</OurProviders>
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GA_ID || "undefined-gaId"}
        />
      </body>
    </html>
  );
}
