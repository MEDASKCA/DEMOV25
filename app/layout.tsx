import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProviderWrapper from "@/components/AuthProviderWrapper";
import { DataSourceProvider } from "@/contexts/DataSourceContext";
import { ListeningProvider } from "@/contexts/ListeningContext";
import { HospitalProvider } from "@/lib/hospitalContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TOM by MEDASKCA™",
  description: "Theatre Operations Manager - Intelligent theatre operations management for NHS trusts",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
        style={{fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'}}
      >
        <HospitalProvider>
          <ListeningProvider>
            <DataSourceProvider>
              <AuthProviderWrapper>
                {children}
              </AuthProviderWrapper>
            </DataSourceProvider>
          </ListeningProvider>
        </HospitalProvider>
      </body>
    </html>
  );
}
