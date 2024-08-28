import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import OurProviders from "@/components/provider";

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
    <html lang="kr">
      <body className={suit.className}>
        <OurProviders>{children}</OurProviders>
      </body>
    </html>
  );
}
